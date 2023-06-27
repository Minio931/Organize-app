import Wrapper from "../UI/Wrapper";
import classes from "./BudgetMain.module.css";
import CurrentBalance from "./CurrentBalance";

const BudgetMain = () => {
  return (
    <Wrapper>
      <h1 className={classes.header}>Budget</h1>
      <CurrentBalance />
    </Wrapper>
  );
};

export default BudgetMain;
