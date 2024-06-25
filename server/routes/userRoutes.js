const express = require("express");
const {
  userProfile,
  changeAvatar,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", userProfile);
router.post("/change-avatar", authMiddleware, changeAvatar);
router.patch("/update-user", authMiddleware, updateUser);
router.delete("/delete/:userId", authMiddleware, deleteUser);
router.get("/", getUsers);

module.exports = router;
