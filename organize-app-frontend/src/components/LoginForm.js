import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <>
      <div className={classes["welcome"]}>
        <p className={classes.display}>Welcome to Organizer App</p>
        <p>
          Please,{" "}
          <Link className={classes.link} to="/">
            log in
          </Link>{" "}
          or if you don't have account{" "}
          <Link className={classes.link} to="/register">
            create a new one
          </Link>{" "}
          :&#41;
        </p>
        <form className={classes.form}>
          <div className={classes.input}>
            <label htmlFor="login">Login: </label>
            <input
              type="text"
              placeholder="Enter your username or email"
              id="login"
              name="login"
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
            />
          </div>
          <div className={classes["form_action"]}>
            <button type="submit">Log in</button>
            <Link to="/register" className={classes.register}>
              Register
            </Link>
          </div>
        </form>
        <p>
          If you forgot your password,{" "}
          <Link to="/" className={classes.link}>
            click here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
