const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./users/routes");
const issuesRouter = require("./issues/routes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(usersRouter);
app.use(issuesRouter);

app.use((_, res) => {
  return res.status(404).send({ message: "Resource not found" });
});

app.listen(4000, () => {
  console.log("Server up and running on port 4000");
});
