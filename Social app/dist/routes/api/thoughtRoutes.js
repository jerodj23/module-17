import express from "express"; // Ensure express is imported
import thoughtController from "../../controllers/thoughtController.js";
// Now you can access the functions as properties of thoughtController
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = thoughtController;
const router = express.Router();
// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);
// /api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
export default router;
