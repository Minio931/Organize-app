import classes from "./RegisterForm.module.css";
import {
  Link,
  json,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const RegisterForm = () => {
  const navigation = useNavigation();
  const data = useActionData();
  const [error, setError] = useState(false);

  let formIsValid = false;

  const isMatching = (value) => value === passwordValue && value !== "";

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: reenterPasswordValue,
    isValid: reenterPasswordIsValid,
    hasError: reenterPasswordHasError,
    valueChangeHandler: reenterPasswordChangeHandler,
    inputBlurHandler: reenterPasswordBlurHandler,
  } = useInput(isMatching);

  if (
    usernameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    reenterPasswordIsValid
  ) {
    formIsValid = true;
  }

  const usernameClasses = usernameHasError;
  const emailClasses = emailHasError ? classes.error : "";
  const passwordClasses = passwordHasError ? classes.error : "";
  const reenterPasswordClasses = reenterPasswordHasError ? classes.error : "";

  useEffect(() => {
    if (data && data.errors && data.errors[0] === "Username is already taken") {
      setError(true);
    }
  }, [data]);

  const isSubmiting = navigation.state === "submitting";
  return (
    <div className={classes["register"]}>
      <p className={classes.display}>Create a new account</p>
      <Form method="POST" className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
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
            className={error || usernameClasses ? classes.error : ""}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            required
          />
          {usernameHasError && (
            <p className={classes["error-text"]}>Please enter a username</p>
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className={emailClasses}
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            required
          />
          {emailHasError && (
            <p className={classes["error-text"]}>Please enter a valid email</p>
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            className={passwordClasses}
            placeholder="Enter your password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            required
          />
          {passwordHasError && (
            <p className={classes["error-text"]}>Please enter a password</p>
          )}
          <input
            type="password"
            id="re-password"
            name="re-password"
            className={reenterPasswordClasses}
            placeholder="Re-enter your password"
            value={reenterPasswordValue}
            onChange={reenterPasswordChangeHandler}
            onBlur={reenterPasswordBlurHandler}
            required
          />
          {reenterPasswordHasError && (
            <p className={classes["error-text"]}>Passwords not match</p>
          )}
        </div>

        <div className={classes.conditions}>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms"> *I agree to the terms and conditions</label>
        </div>
        <div className={classes["form_action"]}>
          <button disabled={!formIsValid} type="submit">
            {isSubmiting ? "Submiting.." : "Register"}
          </button>
          <Link to="/" className={classes.login}>
            Log in
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;

export async function action({ request, params }) {
  const user = await request.formData();
  const userData = {
    username: user.get("username"),
    email: user.get("email"),
    password: user.get("password"),
    firstName: user.get("firstName"),
    lastName: user.get("lastName"),
  };

  let url = "http://localhost:3001/user/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.status === 403) {
    return json({ errors: [data.message] }, { status: 403 });
  }

  if (response.status === 409) {
    return json({ errors: [data.message] }, { status: 409 });
  }

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return redirect("/");
}
