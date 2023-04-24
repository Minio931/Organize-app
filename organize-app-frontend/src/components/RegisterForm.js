import classes from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className={classes["register"]}>
      <p className={classes.display}>Create a new account</p>
      <form className={classes.form}>
        <div className={classes["name_input"]}>
          <div className={classes.input}>
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className={classes.input}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Re-enter your password"
          />
        </div>

        <div className={classes.conditions}>
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms"> *I agree to the terms and conditions</label>
        </div>
        <div className={classes["form_action"]}>
          <button type="submit">Register</button>
          <Link to="/" className={classes.login}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
