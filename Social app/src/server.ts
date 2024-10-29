import express from "express";
import db from "./config/connection";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starting the server once the database connection is open
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});