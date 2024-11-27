const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: process.env.ADMIN_PASSWD,
    database: "pokeweather",
    port: "3306"
});

db.connect((err) => {
    if (err) {
        console.error("Not connected to database.");
        return;
    }
    console.log("Connected to database.")
});

app.get("/user", (req, res) => {
    db.query("SELECT * FROM user WHERE mail = \"test\"", (err, result) => {
        if (err) {
            console.error("Error: ", err);
            res.status(500).send("error");
            return;
        }
        res.json(result);
    });
});

app.get("/pokemon", (req, res) => {
    db.query("SELECT * FROM pokemon WHERE user_fk=1", (err, result) => {
        if (err) {
            console.error("Error: ", err);
            res.status(500).send("error");
            return;
        }
        res.json(result);
    });
});

app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
