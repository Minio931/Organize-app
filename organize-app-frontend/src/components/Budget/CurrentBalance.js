import classes from "./CurrentBalance.module.css";
import { IconPlus } from "@tabler/icons-react";

const CurrentBalance = () => {
  return (
    <div className={classes["balance-wrapper"]}>
      <h3>Current Balance</h3>
      <div className={classes.balance}>
        <div className={classes["balance-amount"]}>
          0.00zł <IconPlus className={classes["add-balance"]} />
        </div>
        <span className={classes["income-month"]}>This month:</span>
        <div className={classes["income"]}>
          <div className={classes["income-title"]}>Income:</div>
          <div className={classes["income-amount"]}>
            0.00zł <IconPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBalance;
