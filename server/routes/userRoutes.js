const express = require("express");
const {
  userProfile,
  changeAvatar,
  updateUser,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", userProfile);
router.post("/change-avatar", authMiddleware, changeAvatar);
router.patch("/update/:userId", authMiddleware, updateUser);

module.exports = router;
