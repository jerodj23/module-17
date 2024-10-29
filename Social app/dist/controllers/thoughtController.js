var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Thought from '../models/Thought.js';
export default {
    // Get all thoughts
    getAllThoughts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thoughts = yield Thought.find({});
            res.json(thoughts);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // GET a single thought by its _id
    getThoughtById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { thoughtId } = req.params;
        try {
            const thought = yield Thought.findById(thoughtId).select("-__v");
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // Create a new thought
    createThought: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newThought = yield Thought.create(req.body);
            res.status(201).json(newThought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // Update a thought by its _id
    updateThought: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { thoughtId } = req.params;
        try {
            const thought = yield Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // Delete a thought by its _id
    deleteThought: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { thoughtId } = req.params;
        try {
            const thought = yield Thought.findByIdAndDelete(thoughtId);
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // Add a reaction to a thought
    addReaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { thoughtId } = req.params;
        try {
            const thought = yield Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
    // DELETE a reaction from a thought by reactionId
    deleteReaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { thoughtId, reactionId } = req.params;
        try {
            const thought = yield Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }),
};
