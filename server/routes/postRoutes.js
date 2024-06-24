const express = require("express");
const { createPost } = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createPost);

module.exports = router;
