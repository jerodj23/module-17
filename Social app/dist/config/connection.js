import { connect, connection } from "mongoose";
// Connect to the MongoDB database
connect("mongodb://127.0.0.1:27017/sociallinkDB")
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
// Export the connection for use in other parts of the application
export default connection;
