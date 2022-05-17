// REQUIERE DRIVER
const spicedPg = require("spiced-pg");
//var dbUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/socialnetwork';
// db equals your Petition Postgres Server ////////
//let db = spicedPg(dbUrl);
let db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

module.exports.createUser = ({ firstname, lastname, email, password }) => {
    return hashPassword(password).then((passwordhash) => {
        const query = `
        INSERT INTO users (firstname, lastname, email, passwordhash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
        const params = [firstname, lastname, email, passwordhash];
        return db.query(query, params);
    });
};

module.exports.login = ({ email, password }) => {
    //// first check if we have a user with the given email in the password
    return this.getUserByEmail({ email }).then((user) => {
        if (!user) {
            return false;
        }
        console.log(user);
        return bcrypt.compare(password, user.passwordhash).then((match) => {
            if (!match) {
                return false;
            } else {
                return user;
            }
        });
    });
};

module.exports.getUserByEmail = ({ email }) => {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then((result) => {
            return result.rows[0];
        });
};
module.exports.getLoggedUser = (userId) => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [userId])
        .then((result) => {
            return result.rows[0];
        });
};
module.exports.getOtherUser = (userId) => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [userId])
        .then((result) => {
            if (result.rows.length < 1) return null;
            return result.rows[0];
        });
};

module.exports.updateProfilePicture = (userId, url) => {
    return db.query(
        `UPDATE users 
         SET profile_picture_url = $2 
         WHERE id = $1
         RETURNING *`,
        [userId, url]
    );
};

module.exports.updateUserBio = (userId, bio) => {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING *`,
        [userId, bio]
    );
};

module.exports.getMatchingUsers = async function (val) {
    console.log("VAL", val);
    const foundUsers = await db.query(
        `SELECT firstname, lastname, profile_picture_url, id FROM users WHERE firstname ILIKE $1
        LIMIT 10`,
        [val + "%"]
    );
    console.log("FOUND USER", foundUsers);
    return foundUsers;
};

module.exports.getLastUsers = async function (id) {
    console.log("ID", id);
    const lastUsers = await db.query(
        `SELECT * FROM users
         WHERE id <> $1
         ORDER BY id DESC
         LIMIT 4`,
        [id]
    );
    return lastUsers;
};

module.exports.friendRequestStatus = (recipient_id, sender_id) => {
    console.log("WE are in friendRequestStatus function on DB");
    return db
        .query(
            `SELECT * FROM friendships
                WHERE (recipient_id = $1 AND sender_id = $2)
                OR (recipient_id = $2 AND sender_id = $1);
                   `,
            [recipient_id, sender_id]
        )
        .then((result) => {
            return result.rows;
        });
};

module.exports.deleteFriendRequest = (recipient_id, sender_id) => {
    console.log("WE ARE IN deleteFriendRequest function on DB");
    return db.query(
        `
    DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1); 
    `,
        [recipient_id, sender_id]
    );
};

module.exports.addFriendRequest = (recipient_id, sender_id) => {
    console.log("ADD FRINED");
    console.log(recipient_id, +sender_id);
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id)
        VALUES ($1, $2)`,
        [recipient_id, +sender_id]
    );
};

module.exports.acceptFriendRequest = (recipient_id, sender_id) => {
    return db.query(
        ` UPDATE friendships
                    SET accepted = TRUE
                    WHERE (sender_id = $1 AND recipient_id = $2)
                    OR
                    (sender_id =$2 AND recipient_id =$1)`,
        [recipient_id, sender_id]
    );
};
