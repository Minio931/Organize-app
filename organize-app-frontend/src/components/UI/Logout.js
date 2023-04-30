import { useNavigate } from "react-router-dom";
import classes from "./Logout.module.css";

const Logout = (props) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <div className={classes["logout-popup"]}>
      <p className={classes["logout-header"]}>
        Are you sure you want to sign out?
      </p>
      <div className={classes["logout-actions"]}>
        <button onClick={props.onClose}>Cancel</button>
        <button onClick={logoutHandler}>Sign out</button>
      </div>
    </div>
  );
};

export default Logout;
