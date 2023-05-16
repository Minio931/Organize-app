const express = require("express");
const router = express.Router();
const todos_controller = require("../controllers/todos.controller");

router.post("/create", todos_controller.create);
router.get("/:userId", todos_controller.get);

module.exports = router;
