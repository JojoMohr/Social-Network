const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer"); // Multer file data middleware
const { upload } = require("./s3");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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