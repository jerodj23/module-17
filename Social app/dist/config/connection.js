"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Connect to the MongoDB database
(0, mongoose_1.connect)("mongodb://127.0.0.1:27017/sociallinkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
// Export the connection for use in other parts of the application
exports.default = mongoose_1.connection;
