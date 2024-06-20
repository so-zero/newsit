const express = require("express");
const { register, login } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/google", google);

module.exports = router;
