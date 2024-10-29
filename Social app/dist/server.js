"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./config/connection"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Middleware for parsing JSON and urlencoded data
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
// Starting the server once the database connection is open
connection_1.default.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
