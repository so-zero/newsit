const express = require("express");
const {
  createComment,
  getComment,
} = require("../controllers/commentControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.get("/:id", getComment);

module.exports = router;
