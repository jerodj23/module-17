var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User.js';
export default {
    // Get all users
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User.find();
            res.json(users);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // Get a single user by its _id with thought and friend data
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findById(req.params.userId) // TypeScript should now recognize userId as a string
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
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // Post a new user
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield User.create(req.body);
            res.status(201).json(newUser);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // Put to update a user by its _id
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // DELETE to remove user by its _id
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Wrap userId in an object for the query
            const user = yield User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // Add a friend to a user's friend list
    addFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
    // Remove a friend from a user's friend list
    deleteFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    }),
};
