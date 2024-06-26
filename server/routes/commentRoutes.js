const express = require("express");
const { createComment } = require("../controllers/commentControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createComment);

module.exports = router;
