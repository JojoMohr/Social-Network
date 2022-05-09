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
    // (you may want to write a getUserByEmail function)
    // if not, return null
    // then check if the found user password_hash matches the given password
    // if not, return null
    // else, return the user
};

module.exports.getUserByEmail = ({ email }) => {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then((result) => {
            return result.rows[0];
        });
};

// ==============PASSWORD RESET=========================================
function updatePasswordByUserEmail({ email, password }) {
    return hashPassword(password).then((password_hash) => {
        const query = `
        UPDATE users SET password_hash = $1 
        WHERE email = $2 
        RETURNING *
`;
        const params = [email, password_hash];
        return db.query(query, params);
    });
}

function sendCode({ code, email }) {
    console.log("[social:email] sending email with code", code, email);
    // ses.sendEmail({
    //     Source: "Whatever <whatever@whatever.de>",
    //     Destination: {
    //         ToAddresses: [email],
    //     },
    //     Message: {
    //         Body: {
    //             Text: {
    //                 Data: "Here's the code" + code,
    //             },
    //         },
    //         Subject: {
    //             Data: "Your application has been accepted",
    //         },
    //     },
    // })
    //     .promise()
    //     .then(() => console.log("it worked!!!"))
    //     .catch((err) => {
    //         console.log(err);
    //     });
}

function createResetPasswordCode({ code, email }) {
    console.log("USE THIS CODE", code);
    const query = `
    INSERT INTO password_reset_codes (code, email)
    VALUES ($1, $2)
    RETURNING *`;
    const params = [code, email];
    return db.query(query, params).then((result) => result.rows[0]);
}

function getCode(code) {
    const query = `
    SELECT * FROM password_reset_codes 
    WHERE code = $1
    `;
    const params = [code];
    return db.query(query, params);
}

module.exports = {
    updatePasswordByUserEmail,
    createResetPasswordCode,
    getCode,
    sendCode,
};