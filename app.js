import express from "express";
import "dotenv/config";


import { pool } from "./src/config/database";

import { LOCAL_PORT } from "./src/config/database";
const PORT = process.env.PORT || LOCAL_PORT;

const app = express();

app
    .set("views", "./src/views")
    .set("view engine", "ejs");

app
    .use(express.static("public"))
    .use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ msg: "app running" });
});

app.get("/api/v1/category", async (req, res) => {
  
    try {
        const query = "SELECT id, title FROM category";
        
        const [results] = await pool.execute(query);
        res.json({
            data: results
        });
    } catch (error) {
        res.json({msg : error})
    }
});

app.get("/api/v1/com", async (req, res) => {
  
    try {
        const query = "SELECT id, user, msg FROM com";
        
        const [result] = await pool.execute(query);
        res.json({
            data: result
        });
    } catch (error) {
        res.json({msg : error})
    }
});



app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));