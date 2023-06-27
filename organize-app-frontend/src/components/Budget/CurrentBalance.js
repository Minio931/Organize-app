import classes from "./CurrentBalance.module.css";
import { IconPlus } from "@tabler/icons-react";

const CurrentBalance = (props) => {
  const addBalanceHandler = () => {
    props.onClick("balance");
  };

  const addIncomeHandler = () => {
    props.onClick("income");
  };

  const balance = props.balance.budget[0].balance.slice(1);
  const income = props.balance.budget[0].income.slice(1);

  return (
    <div className={classes["balance-wrapper"]}>
      <h3>Current Balance</h3>
      <div className={classes.balance}>
        <div className={classes["balance-amount"]}>
          <p>{balance}zł</p>
          <IconPlus
            onClick={addBalanceHandler}
            className={classes["add-balance"]}
          />
        </div>

        <div className={classes["income"]}>
          <span className={classes["income-month"]}>This month:</span>
          <div className={classes["income-title"]}>Income:</div>
          <div className={classes["income-amount"]}>
            <p>{income}zł</p>
            <IconPlus
              onClick={addIncomeHandler}
              className={classes["add-income"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBalance;
