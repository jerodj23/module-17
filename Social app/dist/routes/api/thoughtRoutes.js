"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thoughtController_js_1 = require("../../controllers/thoughtController.js");
const router = express_1.default.Router();
// /api/thoughts
router.route("/").get(thoughtController_js_1.getAllThoughts).post(thoughtController_js_1.createThought);
// /api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(thoughtController_js_1.getThoughtById)
    .put(thoughtController_js_1.updateThought)
    .delete(thoughtController_js_1.deleteThought);
// /api/thoughts/:thoughtId
router.route("/:thoughtId/reactions").post(thoughtController_js_1.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController_js_1.deleteReaction);
exports.default = router;
