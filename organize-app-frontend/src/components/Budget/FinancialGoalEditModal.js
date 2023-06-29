import Button from "../UI/Button";
import classes from "./FinancialGoalEditModal.module.css";
import { IconTrash } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FinancialGoalEditModal = ({ financialGoals, onClose, editForm }) => {
  const navigate = useNavigate();
  const deleteHandler = (event) => {
    event.preventDefault();
    navigate(0);
    fetch(
      `http://localhost:3001/budget/financialGoal/delete/${event.target.id.value}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete financial goal");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editHandler = (event) => {
    const financialGoalId = parseInt(event.target.dataset.id);
    const FinancialGoal = financialGoals.filter(
      (goal) => goal.id === financialGoalId
    );
    editForm({
      type: "financialGoal",
      title: "Edit Financial Goal",
      request: "PUT",
      payload: FinancialGoal[0],
    });
    onClose();
  };

  return (
    <div className={classes["financial-goal-edit-modal-wrapper"]}>
      <div className={classes["financial-goal-edit-modal-header"]}>
        <div className={classes["financial-goal-edit-modal-title"]}>
          Edit Financial Goal
        </div>
      </div>
      <div className={classes["financial-goal-edit-modal-content"]}>
        {financialGoals.map((goal) => {
          return (
            <>
              <Form
                onSubmit={deleteHandler}
                className={classes["financial-goal-edit-modal-item"]}
                key={goal.id}
              >
                <input type="hidden" name="id" value={goal.id} />

                <div
                  className={classes["financial-goal-edit-modal-item-title"]}
                >
                  {goal.name}
                </div>
                <div
                  className={classes["financial-goal-edit-modal-item-action"]}
                >
                  <button
                    type="button"
                    data-id={goal.id}
                    className={classes["edit-button-icon"]}
                    onClick={editHandler}
                  >
                    Edit
                  </button>

                  <Button type="submit" className={classes["delete-button"]}>
                    <IconTrash size={16} color="var(--white)" />
                  </Button>
                </div>
              </Form>
              <hr className={classes["financial-goal-edit-modal-divider"]} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialGoalEditModal;
