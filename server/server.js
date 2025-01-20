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

// Get user data
app.get("/user/:id", (req, res) => {
    const query = "SELECT * FROM user WHERE id = (?)";
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

// Get user ID
app.get("/login/:name", (req, res) => {
    const query = "SELECT id FROM user WHERE name = (?)";
    const {name} = req.params;
    dbQuery(query, res, [name]);
});

// Get caught pokemon
app.get("/pokemon/:id", (req, res) => {
    const {order} = req.query;
    const query = `SELECT id, level, specie FROM pokemon WHERE user_fk = (?) ORDER BY ${order}`;
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

// Get pokemon in team
app.get("/get-team/:id", (req, res) => {
    const query = `
        SELECT 
            p.id AS id, 
            p.specie, 
            p.level
        FROM 
            team
        LEFT JOIN pokemon p ON p.id IN (team.slot_1, team.slot_2, team.slot_3, team.slot_4, team.slot_5, team.slot_6)
        WHERE 
            team.user_fk = ?;
    `;
    const {id} = req.params;
    dbQuery(query, res, [id]);
});

// Catch pokemon
app.post("/catch-pokemon", (req, res) => {
    const query = "INSERT INTO pokemon (specie, level, user_fk) VALUES (?, ?, ?)";
    const {specie, level, id} = req.body;
    dbQuery(query, res, [specie, level, id]);
});

// Update team
app.put("/update-team/:id", (req, res) => {
    const query = "UPDATE team SET slot_1 = ?, slot_2 = ?, slot_3 = ?, slot_4 = ?, slot_5 = ?, slot_6 = ? WHERE user_fk = id";
    const {slot_1, slot_2, slot_3, slot_4, slot_5, slot_6} = req.body;
    dbQuery(query, res, [slot_1, slot_2, slot_3, slot_4, slot_5, slot_6]);
});

// Update user data
app.put("/update-user-data", (req, res) => {
    const query = "UPDATE user SET coins = ?, boost = ? WHERE id = ?";
    const {coins, boost, id} = req.body;
    dbQuery(query, res, [coins, boost, id]);
});


app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
