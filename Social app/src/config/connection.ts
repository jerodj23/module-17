import mongoose from 'mongoose';

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/sociallinkDB", {
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
const connection = mongoose.connection;

export default connection;
