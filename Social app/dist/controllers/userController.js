"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//Import modules from Mongoose
const models_1 = require("../models"); // Adjust the path as necessary
exports.default = {
    // Get all users
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield models_1.User.find();
            res.json(users);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    //Get a single userby its _id with a thought and friend data
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findById(req.params.userId)
                .populate("thoughts")
                .populate("friends")
                .select("-__v");
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
    //Post a new user
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield models_1.User.create(req.body);
            res.status(201).json(newUser);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
    //Put to update a user by its _id
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true });
            if (!user) {
                res.status(404).jspn({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
    //DELETE to remove user by its _id
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
    //Add a friend to a user friend list
    addFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
    //Remove a friend from a user friend list
    deleteFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); //log the error
            res.status(500).json(err);
        }
    }),
};
