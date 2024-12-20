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
    port: "3306",
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        console.error("Not connected to database.");
        return;
    }
    console.log("Connected to database.")
});

const dbQuery = (query, res, params = []) => {
    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error: ", err);
            res.status(500).send("Error: ", err);
            return;
        }
        res.json(result);
    });
};

app.post("/create-user", (req, res) => {
    const query = `
        INSERT INTO user (name, password) VALUES (?, ?);
        SET @user_id = LAST_INSERT_ID();
        INSERT INTO pokemon (specie, level, user_fk) VALUES (351, 5, @user_id);
        INSERT INTO team (slot_1, user_fk) VALUES (LAST_INSERT_ID(), @user_id);
    `
    const {username, password} = req.body;
    dbQuery(query, res, [username, password]);
});

app.get("/user/:id", (req, res) => {
    const query = "SELECT * FROM user WHERE id = (?)";
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

app.get("/login/:name", (req, res) => {
    const query = "SELECT id FROM user WHERE name = (?)";
    const {name} = req.params;
    dbQuery(query, res, [name]);
});

app.get("/pokemon/:id", (req, res) => {
    const query = "SELECT * FROM pokemon WHERE user_fk = (?)";
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

app.get("/team/:id", (req, res) => {
    const query = "SELECT * FROM team WHERE user_fk = (?)";
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
