import express from "express";
import apiRoutes from "./api";

const router = express.Router();

// Use API routes
router.use("/api", apiRoutes);

export default router;
