const express = require("express");
const router = express.Router();
const todos_controller = require("../controllers/todos.controller");

router.post("/create", todos_controller.create);
router.get("/:userId", todos_controller.get);
router.get("/today/:userId", todos_controller.getToday);
router.patch("/update", todos_controller.update);
router.put("/edit", todos_controller.edit);
router.delete("/delete/:id", todos_controller.deleteTodo);
router.get("/get/:id", todos_controller.getTodo);

module.exports = router;
