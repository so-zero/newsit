const express = require("express");
const {
  createComment,
  getComment,
  editComment,
} = require("../controllers/commentControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.get("/:id", getComment);
router.patch("/edit/:id", authMiddleware, editComment);

module.exports = router;
