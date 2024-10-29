"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default; // Destructure Schema directly from mongoose
const momemt_1 = __importDefault(require("momemt"));
//Define the schema for reactions
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(), // Generate a new object by default
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Maximim length of 280 characters
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the curent timestamp
        get: (createdAtVal) => (0, momemt_1.default)(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp using moment
    },
});
//Define the main thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1, // Minimum length of 1 character
        maxlength: 280, // Maximum length of 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the current timestamp
        get: (createdAtVal) => (0, momemt_1.default)(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp using moment
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], //Array of reactions using the reactionSchema
}, {
    toJSON: {
        virtuals: true, // Include virtual properties when conerting to JSON
        getters: true //Include getters in the output
    }
});
// Create the Thought model
const Thought = (0, mongoose_1.model)("Thought", thoughtSchema);
//Export 
exports.default = Thought;
