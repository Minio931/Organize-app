import classes from "./RegisterForm.module.css";
import {
  Link,
  json,
  redirect,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Form } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

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

  console.log(userData);

  let url = "http://localhost:3001/user/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  console.log(response);

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return redirect("/");
}
