"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules from Mongoose
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
// Ceate a new schema for the User model
const userSchema = new mongoose_1.Schema({
    //Define the username field
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    //Define th email field
    email: {
        type: String,
        required: true,
        unique: true,
        //Validate that the email matches a valid email address format
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Please enter a valid email address",
        ],
    },
    // Define the thoughts field as an array of objectIds referencing the thought model
    thoughts: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    // Define the friends field as an array of objectIds referencing the user model (self-reference)
    friends: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    toJSON: {
        //Include virtual properties when converting to JSON
        virtuals: true,
    },
    id: false, //Exclude the default "_id" field from the model
});
//Create a virtual field called friendCount to retrive the length of the friends array
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
//Create the user model based on the userSchema
const User = (0, mongoose_1.model)("User", userSchema);
//Export the user model
exports.default = User;
