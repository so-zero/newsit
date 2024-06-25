const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
} = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/delete/:id", authMiddleware, deletePost);
router.patch("/update/:id", authMiddleware, editPost);

module.exports = router;
