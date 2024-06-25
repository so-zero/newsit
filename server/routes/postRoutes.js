const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.delete("/delete/:postId", authMiddleware, deletePost);

module.exports = router;
