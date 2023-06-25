const budgetService = require("../services/budget.service");

const createBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.createBudget(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const editBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.editBudget(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const getBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.getBudget(req.params.userId);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const deleteBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.deleteBudget(req.params.budgetId);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const createBudgetCategory = async (req, res, next) => {
  try {
    const budget = await budgetService.createBudgetCategory(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const editBudgetCategory = async (req, res, next) => {
  try {
    const budget = await budgetService.editBudgetCategory(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const deleteBudgetCategory = async (req, res, next) => {
  try {
    const budget = await budgetService.deleteBudgetCategory(
      req.params.budgetCategoryId
    );
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const getBudgetCategories = async (req, res, next) => {
  try {
    const budget = await budgetService.getBudgetCategories(req.params.userId);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const updateBudgetCategoryStatus = async (req, res, next) => {
  try {
    const budget = await budgetService.updateBudgetCategoryStatus(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const budget = await budgetService.createTransaction(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const editTransaction = async (req, res, next) => {
  try {
    const budget = await budgetService.editTransaction(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const budget = await budgetService.deleteTransaction(
      req.params.transactionId
    );
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const budget = await budgetService.getTransactions(req.params.userId);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const createFinancialGoal = async (req, res, next) => {
  try {
    const budget = await budgetService.createFinancialGoal(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const editFinancialGoal = async (req, res, next) => {
  try {
    const budget = await budgetService.editFinancialGoal(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const deleteFinancialGoal = async (req, res, next) => {
  try {
    const budget = await budgetService.deleteFinancialGoal(
      req.params.financialGoalId
    );
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const getFinancialGoals = async (req, res, next) => {
  try {
    const budget = await budgetService.getFinancialGoals(req.params.userId);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

const updateFinancialGoalStatus = async (req, res, next) => {
  try {
    const budget = await budgetService.updateFinancialGoalStatus(req.body);
    res.status(200).send(budget);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
  editBudget,
  getBudget,
  deleteBudget,
  createBudgetCategory,
  editBudgetCategory,
  deleteBudgetCategory,
  getBudgetCategories,
  updateBudgetCategoryStatus,
  createTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
  createFinancialGoal,
  editFinancialGoal,
  deleteFinancialGoal,
  getFinancialGoals,
  updateFinancialGoalStatus,
};
