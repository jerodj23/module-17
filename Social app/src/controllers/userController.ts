import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

// Define a type for your route parameters
interface UserParams {
    userId: string;  // Specify that userId is a string
    friendId: string; // Specify that friendId is a string
}

export default {
    // Get all users
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // Get a single user by its _id with thought and friend data
    getUserById: async (req: Request<UserParams>, res: Response) => {
        try {
            const user = await User.findById(req.params.userId) // TypeScript should now recognize userId as a string
                .populate("thoughts")
                .populate("friends")
                .select("-__v");
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // Post a new user
    createUser: async (req: Request, res: Response) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // Put to update a user by its _id
    updateUser: async (req: Request<UserParams>, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // DELETE to remove user by its _id
    deleteUser: async (req: Request<UserParams>, res: Response) => {
        try {
            // Wrap userId in an object for the query
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // Add a friend to a user's friend list
    addFriend: async (req: Request<UserParams>, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
    // Remove a friend from a user's friend list
    deleteFriend: async (req: Request<UserParams>, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
};
