const { response } = require("express");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const userRouter = require("./src/routes/user.route");
const todoRouter = require("./src/routes/todos.route");

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message: message });
  return;
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
