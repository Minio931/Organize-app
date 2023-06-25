const express = require("express");
const router = express.Router();
const budget_controller = require("../controllers/budget.controller");

router.get("/:userId", budget_controller.getBudget);
router.post("/create", budget_controller.createBudget);
router.put("/edit", budget_controller.editBudget);

router.post("/category/create", budget_controller.createBudgetCategory);
router.put("/category/edit", budget_controller.editBudgetCategory);
router.delete(
  "/category/delete/:budgetCategoryId",
  budget_controller.deleteBudgetCategory
);
router.get("/category/:userId", budget_controller.getBudgetCategories);
router.patch(
  "/category/updateStatus",
  budget_controller.updateBudgetCategoryStatus
);
router.post("/transaction/create", budget_controller.createTransaction);
router.put("/transaction/edit", budget_controller.editTransaction);
router.delete(
  "/transaction/delete/:transactionId",
  budget_controller.deleteTransaction
);
router.get("/transaction/:userId", budget_controller.getTransactions);
router.post("/financialGoal/create", budget_controller.createFinancialGoal);
router.put("/financialGoal/edit", budget_controller.editFinancialGoal);
router.delete(
  "/financialGoal/delete/:financialGoalId",
  budget_controller.deleteFinancialGoal
);
router.patch(
  "/financialGoal/updateStatus",
  budget_controller.updateFinancialGoalStatus
);

module.exports = router;
