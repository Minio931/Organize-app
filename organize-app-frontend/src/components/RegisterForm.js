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

const RegisterForm = () => {
  const navigation = useNavigation();
  const data = useActionData();
  const [error, setError] = useState(false);
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
            className={error ? classes.error : ""}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <input
            type="password"
            id="re-password"
            name="re-password"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <div className={classes.conditions}>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms"> *I agree to the terms and conditions</label>
        </div>
        <div className={classes["form_action"]}>
          <button type="submit">
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
    console.log(response);
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return redirect("/");
}
