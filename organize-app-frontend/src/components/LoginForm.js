import { Link, Form } from "react-router-dom";
import {
  json,
  redirect,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

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
            <button type="submit">
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

  let url = "http://localhost:3001/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return redirect("/dashboard");
}
