import classes from "./TransactionHistory.module.css";
import { useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

const TransactionHistoryItem = ({ name, status, date, amount, id, edit }) => {
  const editTransactionHandler = () => {
    edit({
      type: "transaction",
      title: "Edit Transaction",
      request: "PUT",
      transaction: {
        id: id,
        name: name,
        status: status,
        date: date,
        amount: amount,
      },
    });
  };
  let statusElement =
    status === "completed" ? (
      <div className={classes["transaction-history-item-success"]}>Success</div>
    ) : (
      <div className={classes["transaction-history-item-failed"]}>Incoming</div>
    );
  return (
    <div
      id={id}
      className={classes["transaction-history-item"]}
      onClick={editTransactionHandler}
    >
      <div className={classes["transaction-history-item-name"]}>{name}</div>
      {statusElement}
      <div className={classes["transaction-history-item-date"]}>{date}</div>
      <div className={classes["transaction-history-item-amount"]}>
        {amount}zł
      </div>
    </div>
  );
};
const TransactionHistory = ({ className, transactions, onClick }) => {
  const [transactionList, setTransactionList] = useState(
    transactions.transactions ? transactions.transactions : []
  );

  const addTransactionHandler = () => {
    onClick({
      type: "transaction",
      title: "Add Transaction",
      request: "POST",
    });
  };

  const transactionHistoryClasses = `${classes["transaction-history-wrapper"]} ${className}`;
  return (
    <div className={transactionHistoryClasses}>
      <div className={classes["transaction-history-header"]}>
        <h3>Transaction History</h3>
        <div className={classes["filter-action"]}>
          <button className={classes["filter-button"]}>
            Filter <IconAdjustmentsHorizontal />
          </button>
        </div>
      </div>
      <div className={classes["transaction-history-body"]}>
        <div className={classes["transaction-history-headers"]}>
          <div className={classes["header-item"]}>Name</div>
          <div className={classes["header-item"]}>Status</div>
          <div className={classes["header-item"]}>Date</div>
          <div className={classes["header-item"]}>Amount</div>
        </div>
        {transactionList.map((transaction) => {
          return (
            <TransactionHistoryItem
              key={transaction.id}
              id={transaction.id}
              name={transaction.name}
              status={transaction.status}
              date={new Date(transaction.transaction_date).toLocaleDateString()}
              amount={transaction.value.slice(1)}
              edit={onClick}
            />
          );
        })}

        <div
          className={classes["add-transaction"]}
          onClick={addTransactionHandler}
        >
          <div>Add Transaction</div>
          <div>
            <IconPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
