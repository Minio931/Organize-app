const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.post("/register", user_controller.create);
router.post("/login", user_controller.get);

module.exports = router;
