import express from "express";
import userRoutes from "./userRoutes";
import thoughtRoutes from "./thoughtRoutes";

const router = express.Router();

// User routes
router.use("/users", userRoutes);

// Thought routes
router.use("/thoughts", thoughtRoutes);

export default router;