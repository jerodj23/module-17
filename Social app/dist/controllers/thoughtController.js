"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const models_1 = require("../models"); // Use ES module import syntax
exports.default = {
    // Get all thoughts
    getAllThoughts(req, res) {
        models_1.Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //GET a single thought by its _id
    getThoughtById(req, res) {
        const { thoughtId } = req.params;
        models_1.Thought.findOne({ _id: thoughtId })
            .select("-__v")
            .then((thought) => {
            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "Thought with this id is not found" });
            }
            res.json(thought);
        })
            .catch((err) => res.status(500).json(err));
    },
    //Create a new thought
    createThought(req, res) {
        models_1.Thought.create(req.body)
            .then((thought) => {
            return models_1.User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
        })
            .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
            .catch((err) => res.status(500).json(err));
    },
    //Update a thought by its _id
    updateThought(req, res) {
        const { thoughtId } = req.params;
        models_1.Thought.findOneAndUpdate({ _id: thoughtId }, req.body, { new: true })
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(thought);
        })
            .catch((err) => res.status(500).json(err));
    },
    //Delete a thought by its _id
    deleteThought(req, res) {
        const { thoughtId } = req.params;
        models_1.Thought.findOneAndDelete({ _id: thoughtId })
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(thought);
        })
            .catch((err) => res.status(500).json(err));
    },
    // Add a reaction to a thought
    addReaction(req, res) {
        const { thoughtId } = req.params;
        models_1.Thought.findOneAndUpdate({ _id: thoughtId }, { $push: { reactions: req.body } }, { new: true })
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(thought);
        })
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a reaction from a thought by reactionId
    deleteReaction(req, res) {
        const { thoughtId, reactionId } = req.params;
        models_1.Thought.findOneAndUpdate({ _id: thoughtId }, { $pull: { reactions: { reactionId } } }, { new: true })
            .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(thought);
        })
            .catch((err) => res.status(500).json(err));
    },
};
