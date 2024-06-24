const express = require("express");
const { createPost, getPosts } = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);

module.exports = router;
