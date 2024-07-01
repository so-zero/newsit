const express = require("express");
const {
  register,
  login,
  newsletter,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/newsletter", newsletter);

module.exports = router;
