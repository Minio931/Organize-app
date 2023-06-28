import { Form } from "react-router-dom";
import classes from "./BudgetForm.module.css";
import Button from "../UI/Button";

const BudgetForm = (props) => {
  return (
    <Form>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-header"]}>
          <h2 className={classes["form-title"]}>Add Financial Goal</h2>
        </div>
        <hr className={classes["form-divider"]} />
        <div className={classes["form-content"]}>
          <input type="hidden" name="id" />
          <div className={classes["form-group"]}>
            <label className={classes["form-label"]} htmlFor="goal-name">
              Goal Name
            </label>
            <input className={classes["form-input"]} id="name" name="name" />
          </div>
          <div className={classes["form-group"]}>
            <label className={classes["form-label"]} htmlFor="goal-amount">
              Goal Amount
            </label>
            <input
              className={classes["form-input"]}
              type="number"
              id="amount"
              name="amount"
            />
          </div>
          <div className={classes["form-group"]}>
            <label className={classes["form-label"]} htmlFor="actual-deposit">
              Actual Deposit
            </label>
            <input
              className={classes["form-input"]}
              type="number"
              defaultValue={0}
              id="deposit"
              name="deposit"
            />
          </div>
          <div className={classes["form-action"]}>
            <Button type="submit">Add</Button>
            <Button
              className={classes["close-button"]}
              type="button"
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default BudgetForm;
