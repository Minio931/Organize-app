import classes from "./ExpenseCategoryItem.module.css";
import React from "react";
import CircleProgress from "./CircleProgress";
import { IconDeviceGamepad } from "@tabler/icons-react";
import { IconShoppingCart } from "@tabler/icons-react";
import { IconActivity } from "@tabler/icons-react";
import { IconHome2 } from "@tabler/icons-react";
import { IconCash } from "@tabler/icons-react";
import { IconBusStop } from "@tabler/icons-react";
import { IconGift } from "@tabler/icons-react";
import { IconPizza } from "@tabler/icons-react";

const ExpeseCategoryItem = ({
  id,
  category,
  expenses,
  planned,
  icon,
  color,
  EditCategoryHandler,
}) => {
  // icon = React.cloneElement(icon, { color: color });

  let iconMap = {
    IconDeviceGamepad: <IconDeviceGamepad color={color} />,
    IconShoppingCart: <IconShoppingCart color={color} />,
    IconActivity: <IconActivity color={color} />,
    IconHome2: <IconHome2 color={color} />,
    IconCash: <IconCash color={color} />,
    IconBusStop: <IconBusStop color={color} />,
    IconGift: <IconGift color={color} />,
    IconPizza: <IconPizza color={color} />,
  };

  const editCategoryHandler = () => {
    EditCategoryHandler({
      type: "category",
      title: "Edit Category",
      request: "PUT",
      category: {
        name: category,
        planned: planned,
        icon: icon,
        color: color,
        expenses: expenses,
        id: id,
      },
    });
  };

  return (
    <div className={classes["category-wrapper"]} onClick={editCategoryHandler}>
      <div className={classes["category-header"]}>
        <CircleProgress progress={50} color={color} />
        <div className={classes["category-icon"]}>{iconMap[icon]}</div>
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
