import { Request, Response } from "express";
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export default {
    // Get all thoughts
    getAllThoughts: async (req: Request, res: Response): Promise<void> => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // GET a single thought by its _id
    getThoughtById: async (req: Request, res: Response): Promise<void> => {
        const { thoughtId } = req.params;
        try {
            const thought = await Thought.findById(thoughtId).select("-__v");
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a new thought
    createThought: async (req: Request, res: Response): Promise<void> => {
        try {
            const newThought = await Thought.create(req.body);
            res.status(201).json(newThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update a thought by its _id
    updateThought: async (req: Request, res: Response): Promise<void> => {
        const { thoughtId } = req.params;
        try {
            const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a thought by its _id
    deleteThought: async (req: Request, res: Response): Promise<void> => {
        const { thoughtId } = req.params;
        try {
            const thought = await Thought.findByIdAndDelete(thoughtId);
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    addReaction: async (req: Request, res: Response): Promise<void> => {
        const { thoughtId } = req.params;
        try {
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a reaction from a thought by reactionId
    deleteReaction: async (req: Request, res: Response): Promise<void> => {
        const { thoughtId, reactionId } = req.params;
        try {
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
