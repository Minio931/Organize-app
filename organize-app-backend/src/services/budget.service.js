const db = require("../config/db.config.js");
const { NotFoundError } = require("../utils/errors.utils.js");

const createBudget = async (budget) => {
  const { balance, income, expenses, planned, userId } = budget;

  const result = await db.query(
    "INSERT INTO budget (balance, income, expenses, planned, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [balance, income, expenses, planned, userId]
  );

  return { message: `A new budget has been added: ${result.rows[0]}` };
};

const updateBalance = async (budget) => {
  const { userId, amount } = budget;
  const result = await db.query(
    "UPDATE budget SET balance = $1 WHERE user_id = $2 RETURNING *",
    [amount, userId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget not found");
  }

  return { message: `Budget has been updated: ${result.rows[0]}` };
};

const updateIncome = async (budget) => {
  const { userId, amount } = budget;
  const result = await db.query(
    "UPDATE budget SET income = $1 WHERE user_id = $2 RETURNING *",
    [amount, userId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget not found");
  }

  return { message: `Budget has been updated: ${result.rows[0]}` };
};

const editBudget = async (budget) => {
  const { userId, balance, income, expenses, planned } = budget;
  const result = await db.query(
    "UPDATE budget SET balance = $1, income = $2, expenses = $3, planned = $4 WHERE user_id = $5 RETURNING *",
    [balance, income, expenses, planned, userId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget not found");
  }

  return { message: `Budget has been updated: ${result.rows[0]}` };
};

const getBudget = async (userId) => {
  const result = await db.query(
    "SELECT * FROM budget WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError("No budget found for this user");
  }
  return { budget: result.rows };
};

const getBudgetCategories = async (userId) => {
  const result = await db.query(
    "SELECT * FROM budget_categories WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError("No budget categories not found for this user");
  }
  return { budgetCategories: result.rows };
};

const createBudgetCategory = async (budgetCategory) => {
  const { userId, name, actualStatus, planned } = budgetCategory;

  const result = await db.query(
    "INSERT INTO budget_categories (user_id, name, actual_status, planned) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, name, actualStatus, planned]
  );

  return { message: `A new budget category has been added: ${result.rows[0]}` };
};

const editBudgetCategory = async (budgetCategory) => {
  const { categoryId, name, actualStatus, planned } = budgetCategory;
  const result = await db.query(
    "UPDATE budget_categories SET name = $1, actual_status = $2, planned = $3 WHERE id = $4 RETURNING *",
    [name, actualStatus, planned, categoryId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget category not found");
  }
  return { message: `Budget category has been updated: ${result.rows[0]}` };
};

const deleteBudgetCategory = async (budgetCategoryId) => {
  const result = await db.query(
    "DELETE FROM budget_categories WHERE id = $1 RETURNING *",
    [budgetCategoryId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget category not found");
  }
  return { message: `Budget category has been deleted` };
};

const updateBudgetCategoryStatus = async (budgetCategory) => {
  const { categoryId, actualStatus } = budgetCategory;
  const result = await db.query(
    "UPDATE budget_categories SET actual_status = $1 WHERE id = $2 RETURNING *",
    [actualStatus, categoryId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Budget category not found");
  }
  return { message: `Budget category has been updated: ${result.rows[0]}` };
};

const createTransaction = async (transaction) => {
  const { userId, budgetCategoryId, value, transactionDate, name, status } =
    transaction;

  const result = await db.query(
    "INSERT INTO transactions (user_id, budget_category_id, value, transaction_date, name, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, budgetCategoryId, value, transactionDate, name, status]
  );

  return { message: `A new transaction has been added: ${result.rows[0]}` };
};

const editTransaction = async (transaction) => {
  const {
    transactionId,
    budgetCategoryId,
    value,
    transactionDate,
    name,
    status,
  } = transaction;
  const result = await db.query(
    "UPDATE transactions SET budget_category_id = $1, value = $2, transaction_date = $3, name = $4, status = $5 WHERE id = $6 RETURNING *",
    [budgetCategoryId, value, transactionDate, name, status, transactionId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Transaction not found");
  }
  return { message: `Transaction has been updated: ${result.rows[0]}` };
};

const deleteTransaction = async (transactionId) => {
  const result = await db.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [transactionId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Transaction not found");
  }
  return { message: `Transaction has been deleted` };
};

const getTransactions = async (userId) => {
  console.log(userId);
  const result = await db.query(
    "SELECT * FROM transactions WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError("No transactions found for this user");
  }
  return { transactions: result.rows };
};

const createFinancialGoal = async (financialGoal) => {
  const { userId, name, actualDeposit, goal } = financialGoal;

  const result = await db.query(
    "INSERT INTO financial_goals (user_id, name, actual_deposit, goal) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, name, actualDeposit, goal]
  );

  return { message: `A new financial goal has been added: ${result.rows[0]}` };
};

const editFinancialGoal = async (financialGoal) => {
  const { financialGoalId, name, actualDeposit, goal } = financialGoal;
  const result = await db.query(
    "UPDATE financial_goals SET name = $1, actual_deposit = $2, goal = $3 WHERE id = $4 RETURNING *",
    [name, actualDeposit, goal, financialGoalId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Financial goal not found");
  }
  return { message: `Financial goal has been updated: ${result.rows[0]}` };
};

const deleteFinancialGoal = async (financialGoalId) => {
  const result = await db.query(
    "DELETE FROM financial_goals WHERE id = $1 RETURNING *",
    [financialGoalId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Financial goal not found");
  }
  return { message: `Financial goal has been deleted` };
};

const getFinancialGoals = async (userId) => {
  const result = await db.query(
    "SELECT * FROM financial_goals WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError("No financial goals found for this user");
  }
  return { financialGoals: result.rows };
};

const updateFinancialGoalStatus = async (financialGoal) => {
  const { financialGoalId, actualDeposit } = financialGoal;
  const result = await db.query(
    "UPDATE financial_goals SET actual_deposit = $1 WHERE id = $2 RETURNING *",
    [actualDeposit, financialGoalId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Financial goal not found");
  }
  return { message: `Financial goal has been updated: ${result.rows[0]}` };
};

module.exports = {
  createBudget,
  editBudget,
  getBudget,
  getBudgetCategories,
  createBudgetCategory,
  editBudgetCategory,
  deleteBudgetCategory,
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
  updateBalance,
  updateIncome,
};
