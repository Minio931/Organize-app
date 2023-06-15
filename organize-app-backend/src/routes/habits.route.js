const express = require("express");
const router = express.Router();
const habits_controller = require("../controllers/habits.controller");

router.get("/:userId", habits_controller.get);
router.post("/complete", habits_controller.complete);
router.delete("/deleteComplete", habits_controller.deleteComplete);

module.exports = router;
