import { Suspense, useState } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import Modal from "../UI/Modal";
import Wrapper from "../UI/Wrapper";
import classes from "./BudgetMain.module.css";
import CurrentBalance from "./CurrentBalance";
import ManageBalanceForm from "./ManageBalanceForm";

const BudgetMain = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [typeOfRequest, setTypeOfRequest] = useState();
  const { balance } = useLoaderData();

  const showModalHandler = (type) => {
    setIsModalShown(true);
    setTypeOfRequest(type);
  };

  const hideModalHandler = () => {
    setIsModalShown(false);
  };
  return (
    <Wrapper>
      <h1 className={classes.header}>Budget</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={balance}>
          {(balance) => (
            <CurrentBalance onClick={showModalHandler} balance={balance} />
          )}
        </Await>
      </Suspense>
      {isModalShown && (
        <Modal onClose={hideModalHandler}>
          <ManageBalanceForm type={typeOfRequest} onClose={hideModalHandler} />
        </Modal>
      )}
    </Wrapper>
  );
};

export async function loadBudgetData() {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const response = await fetch("http://localhost:3001/budget/" + userId);

  if (!response.ok) {
    return json({ message: "Something went wrong", status: 500 });
  }

  const responseData = await response.json();

  return responseData;
}

export function loader() {
  return defer({
    balance: loadBudgetData(),
  });
}

export default BudgetMain;
