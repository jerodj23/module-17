"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./api/index.js")); // Ensure the correct path and extension
const router = express_1.default.Router();
router.use("/api", index_js_1.default);
router.use((req, res) => {
    return res.send("Wrong route!");
});
exports.default = router;
