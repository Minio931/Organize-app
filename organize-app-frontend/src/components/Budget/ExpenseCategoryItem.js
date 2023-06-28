import classes from "./ExpenseCategoryItem.module.css";
import React from "react";
import CircleProgress from "./CircleProgress";

const ExpeseCategoryItem = ({ category, expenses, planned, icon, color }) => {
  icon = React.cloneElement(icon, { color: color });
  return (
    <div className={classes["category-wrapper"]}>
      <div className={classes["category-header"]}>
        <CircleProgress progress={50} color={color} />
        <div className={classes["category-icon"]}>{icon}</div>
        <div className={classes["category-name"]}>{category}</div>
      </div>
      <div className={classes["category-expenses"]}>
        <span className={classes["actual-expenses"]}>{expenses}zł</span>
        <span className={classes["planned-expenses"]}>{planned}zł</span>
      </div>
    </div>
  );
};

export default ExpeseCategoryItem;
