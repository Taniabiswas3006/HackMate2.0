const express = require("express");
const router = express.Router();
const { signup, login, me, updateProfile } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);
router.put("/profile", updateProfile);

module.exports = router;
