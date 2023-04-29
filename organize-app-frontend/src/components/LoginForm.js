import { Link, Form } from "react-router-dom";
import {
  json,
  redirect,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import classes from "./LoginForm.module.css";
import useInput from "../hooks/useInput";
import { useEffect } from "react";

const isNotEmpty = (value) => value.trim() !== "";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/organize-app/dashboard");
    }
  });

  const {
    value: loginValue,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangeHandler: loginChangeHandler,
    inputBlurHandler: loginBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (loginIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const loginClasses = loginHasError ? classes.error : "";
  const passwordClasses = passwordHasError ? classes.error : "";

  const isLogging = navigation.state === "submitting";
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
        <Form method="POST" className={classes.form}>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          <div className={classes.input}>
            <label htmlFor="login">Login: </label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className={loginClasses}
              id="login"
              name="login"
              value={loginValue}
              onChange={loginChangeHandler}
              onBlur={loginBlurHandler}
            />
            {loginHasError && (
              <p className={classes["error-text"]}>Please enter a username</p>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={passwordClasses}
              id="password"
              name="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes["error-text"]}>Please enter a password</p>
            )}
          </div>
          <div className={classes["form_action"]}>
            <button disabled={!formIsValid} type="submit">
              {isLogging ? "Logging in.." : "Log in"}
            </button>
            <Link to="/register" className={classes.register}>
              Register
            </Link>
          </div>
        </Form>
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

export async function action({ request, params }) {
  const user = await request.formData();
  const data = {
    login: user.get("login"),
    password: user.get("password"),
  };

  let url = "http://localhost:3001/user/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (response.status === 404) {
    return json(
      { errors: ["Login or password is incorrect"] },
      { status: 404 }
    );
  }
  if (!response.ok) {
    return json({ message: "Something went wrong" }, { status: 500 });
  } else {
    console.log(responseData.user);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    return redirect("/organize-app/dashboard");
  }
}
