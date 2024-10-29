import express from "express";
import userController from "../../controllers/userController";

const router = express.Router();

// GET all users
router.get("/", userController.getAllUsers);

// GET a single user by its _id
router.get("/:userId", userController.getUserById);

// POST a new user
router.post("/", userController.createUser);

// PUT to update a user by its _id
router.put("/:userId", userController.updateUser);

// DELETE to remove user by its _id
router.delete("/:userId", userController.deleteUser);

// Add a friend to a User's friend list
router.post("/:userId/friends/:friendId", userController.addFriend);

// Remove a friend from a User's friend list
router.delete("/:userId/friends/:friendId", userController.deleteFriend);

export default router;
