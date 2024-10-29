"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require();
const router = express_1.default.Router();
// GET all users
router.get("/", module_1.getAllUsers);
// GET a single user by its _id and populated though and friend data
router.get("/:userId", module_1.getUserById);
// POST a new user
router.post("/", module_1.createUser);
// PUT to update a user by its _id
router.put("/:userId", module_1.updateUser);
// DELETE to remove user by its _id
router.delete("/:userId", module_1.deleteUser);
// Add a friend to a User's friend list
router.post("/:userId/friends/:friendId", module_1.addFriend);
// Rempve a friend frpm a User's friend list
router.delete("/:userId/friends/:friendId", module_1.deleteFriend);
exports.default = router;
