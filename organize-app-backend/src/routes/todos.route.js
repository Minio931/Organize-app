const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.post("/create", user_controller.create);
router.get("/:userId", user_controller.get);

module.exports = router;
