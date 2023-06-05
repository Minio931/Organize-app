const express = require("express");
const router = express.Router();
const habits_controller = require("../controllers/habits.controller");

router.get("/:userId", habits_controller.get);

module.exports = router;
