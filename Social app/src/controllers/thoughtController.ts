import { User, Thought } from '../models';
import { Request, Response } from 'express';

// Define type for route parameters
interface ThoughtParams {
    thoughtId: string; // Specify that thoughtId is a string
}

export default {
    // Get all thoughts
    getAllThoughts: async (req: Request, res: Response) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Get a single thought by its _id
    getThoughtById: async (req: Request<ThoughtParams>, res: Response) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
                .select("-__v");
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Create a new thought
    createThought: async (req: Request, res: Response) => {
        try {
            const newThought = await Thought.create(req.body);
            res.status(201).json(newThought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Update a thought by its _id
    updateThought: async (req: Request<ThoughtParams>, res: Response) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Delete a thought by its _id
    deleteThought: async (req: Request<ThoughtParams>, res: Response) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    addReaction: async (req: Request<ThoughtParams>, res: Response) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },

    // Delete a reaction from a thought by reactionId
    deleteReaction: async (req: Request<ThoughtParams>, res: Response) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err); // Log the error
            res.status(500).json(err);
        }
    },
};
