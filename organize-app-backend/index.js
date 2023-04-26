const { response } = require("express");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const userRouter = require("./src/routes/user.route");

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
