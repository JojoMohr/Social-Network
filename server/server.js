const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./database/db");
const uidSafe = require("uid-safe"); // Random string generator
const multer = require("multer"); // Multer file data middleware
const { upload } = require("./s3");

// middleware  makes sure that our server parses incoming json/application requests
//→ we need this so that we can access values in our req.body easier (check imageboard)
app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

////////// REQUIERE COOKIE-SESSION ///////////////////////////////////
const cookieSession = require("cookie-session");
const { request } = require("express");
app.use(
    cookieSession({
        secret: `noscooters`,
        maxAge: 1000 * 60 * 60 * 24 * 14,

        sameSite: true,
    })
);

//=================MULTER==================================
// ======= Specify the storage location  =========//

const storage = multer.diskStorage({
    // Directory
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },
    // Filename
    filename: (req, file, callback) => {
        // 1. Generate a random string
        uidSafe(24).then((randomId) => {
            // 2. Construct random file name with extension
            const fileName = `${randomId}${path.extname(file.originalname)}`;
            callback(null, fileName);
        });
    },
});

const uploader = multer({ storage });

//=== Add a new route to upload Profil Pic =================

app.post(
    "/api/profile_picture",
    uploader.single("file"),
    upload,
    (req, res) => {
        console.log("req.body:\t", req.body);
        // Multer puts the file info in `req.file`
        console.log("req.file:\t", req.file);
        //console.log("req.params.id", req.params.id);
        let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
        let userId = req.session.userId;
        console.log("Find the IMG with this URL: ", url);

        if (req.file) {
            db.updateProfilePicture(userId, url)
                .then((insertedImage) => {
                    console.log("IMAGE HAS BEEN UPLOADED 📥");
                    console.log("INSERTED IMAGE", insertedImage.rows[0]);
                    console.log("URL: ", url);
                    res.json({ url });
                })
                .catch((error) => {
                    console.log("ERROR WHILE UPLOADING ❌📥", error);
                });
        } else {
            res.json({
                success: false,
            });
        }
    }
);
//================================================================
app.get("/api/user/:otherUserId", async (req, res) => {
    const otherUserId = req.params.otherUserId;
    const sessionId = req.session.userId;
    console.log("IDIDID", otherUserId, sessionId);

    try {
        const result = await db.getOtherUser(otherUserId);
        if (otherUserId == sessionId) {
            res.json({ error: "THIS IS YOU" });
        }
        if (!otherUserId) {
            res.json({ error: "I DIDNT FIND ANYTING" });
        } else {
            res.json(result || null);
            console.log("GET RESULTS", result);
        }
    } catch (error) {
        console.log("ERROR IN CATCH", error.message);
    }
});

//================================================================

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});
//================================================================

app.get("/welcome", function (req, res) {
    console.log("WELCOME PAGE");
});

//================================================================
app.post("/findPeople", function (req, res) {
    console.log("USERS POST 📥");
    const { user } = req.body;
    console.log("USER ✅", user);
    // get the value that is beeing typed
    // paste value into the function
    if (user == "") {
        db.getLastUsers(req.session.userId).then((lastUsers) => {
            res.json(lastUsers.rows);
        });
        return;
    }
    db.getMatchingUsers(user)
        .then((matchingUsers) => {
            console.log(
                "RESULTS IN SERVER FUNCTION:",
                matchingUsers.rows[0].firstname
            );
            res.json(matchingUsers.rows);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
});

// =====================POST ON REGISTER==========================
app.post("/register", function (req, res) {
    console.log("POST ON REGISTER 📝");
    let { firstname, lastname, email, password } = req.body;

    console.log(firstname, lastname, email, password);
    // call createUser with passed arguments
    db.createUser(req.body)
        .then(({ rows }) => {
            // store the id in a cookie

            req.session.userId = rows[0].id;
            res.json({ success: true });
            //res.redirect("/welcome")
            console.log("⬆️ Upload Complete!!");
            console.log("ROWS", rows);

            // res.redirect("/profile")
        })
        .catch((error) => {
            //  res.render("register")
            res.json({ success: false });

            console.log("USER EXISTS ALREADY EXISTS ❌", error);
        });
});

//===========GET "/api/users/me"==================================

app.get("/api/users/me", async (req, res) => {
    console.log("API/USERS/ME");
    // GET DB REQ WITH USER INFO
    try {
        const userId = req.session.userId;
        console.log("USER ID", userId);
        const result = await db.getLoggedUser(userId);
        res.json(result);
        console.log("GET RESULTS", result);
    } catch (error) {
        console.log("ERROR IN CATCH", error.message);
    }
});

app.post("/api/users/bio", async (req, res) => {
    console.log("UPDATING USER BIO");
    try {
        const userId = req.session.userId;
        console.log("USER ID", userId);
        const { bio } = req.body;
        console.log("BIO", bio);

        const result = await db.updateUserBio(userId, bio);
        res.json(result);
        // get the new user Bio
        console.log("RESULTS", result.rows[0].bio);
    } catch (error) {
        console.log("ERROR IN CATCH post(/api/users/bio ", error.message);
    }
});

//==  GET /friendship-status/:id
app.get("/get-friendship-status/:id", async (req, res) => {
    try {
        const recipient_id = req.params.id;
        const sender_id = req.session.userId;
        console.log("LOGLOGLOGL", recipient_id, sender_id);

        const friendRequestStatus = await db.friendRequestStatus(
            recipient_id,
            sender_id
        );

        console.log("friendshipStatus", friendRequestStatus);
        // NO FRIENDSHIP AND NO REQUEST
        if (friendRequestStatus.length < 1) {
            return res.json({ error: null, status: "ADD FRIEND" });
        }
        // ACCEPTED YES => UNFRIEND
        if (friendRequestStatus[0].accepted) {
            res.json({ error: null, status: "UNFRIEND" });
        }

        // REQUEST PENDING  / ACCEPT REQUEST /
        if (
            sender_id == friendRequestStatus[0].recipient_id &&
            friendRequestStatus[0].accepted == false
        ) {
            res.json({ error: null, status: "CANCEL REQUEST" });
        }
        // REQUEST PENDING  / CANCEL REQUEST /
        if (
            friendRequestStatus[0].accepted == false &&
            friendRequestStatus[0].sender_id == sender_id
        ) {
            res.json({ error: null, status: "ACCEPT REQUEST" });
        }
    } catch (error) {
        console.log("ERROR IN CATCH friendship-status :", error.message);
    }
});

//==POST set-friendship-status ===================================

app.post("/set-friendship-status", async (req, res) => {
    console.log("REQ BODY", req.body);
    const sender_id = req.session.userId;
    const recipient_id = req.body.recipient_id;
    try {
        // ADDING FRIEND
        if (req.body.status == "ADD FRIEND") {
            const addFriend = await db.addFriendRequest(
                sender_id,
                recipient_id
            );
            res.json({ error: null, status: "CANCEL REQUEST" });
        }
        // UNFRIEND
        if (req.body.status == "UNFRIEND") {
            const deleteFriendRequest = await db.deleteFriendRequest(
                recipient_id,
                sender_id
            );
            res.json({ error: null, status: "ADD FRIEND" });
        }

        //ACCEPT FRIENDSHIP
        if (req.body.status == "ACCEPT REQUEST") {
            const acceptFriendRequest = await db.acceptFriendRequest(
                recipient_id,
                sender_id
            );
            res.json({ error: null, status: "UNFRIEND" });
        }

        if (req.body.status == "CANCEL REQUEST") {
            //CANCEL REQUEST
            const deleteFriendRequest = await db.deleteFriendRequest(
                recipient_id,
                sender_id
            );
            res.json({ error: null, status: "ADD FRIEND" });
        }
    } catch (error) {
        console.log("ERROR: " + error);
    }
});

//== GET /friends-and-wannabes=====================================
// Using but already present from previous friend button feature
// POST /friendship/accept
// POST /friendship/unfriend
app.get("/friends-and-wannabes", async (req, res) => {
    console.log("GET REQUEST ON /friends-and-wannabes", req.session);
    let userId = req.session.userId;
    let friendships = await db.getFriendships(userId);
    console.log("FRIENDSHIPS", friendships);
    res.json(friendships);
});

//======================POST ON LOGIN=============================
app.post("/login", function (req, res) {
    console.log("POST ON LOGIN📝");
    let { email, password } = req.body;
    console.log("EMAIL PW", email, password);
    if (email == "" || password == "") {
        res.json({ success: false });
        console.log("EMAIL OR PW MISSING ❌");
        return false;
    }

    db.login(req.body).then((user) => {
        console.log("REQ BODY", req.body);

        if (!user) {
            console.log("CREDENTIALS WRONG OR USER DOESNT EXIST ❌");
            res.json({ success: false });
            return;
        }
        console.log("LOGGED IN ✅");
        req.session.userId = user.id;
        // req.session.userName = user
        // let firstname = user.firstname
        res.json({ success: true });

        //console.log("LOGGED USER", user);
    });
});

//=============Post on Logout======================================w

app.get("/logout", (req, res) => {
    // res.render("login");
    console.log("LOGGING OUT USER");
    req.session = null;
    res.json({ success: true });
});
//================================================================

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. on PORT 3000 🟢");
});
