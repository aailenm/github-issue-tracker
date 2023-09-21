const express = require("express");

const router = express.Router();

const users = ["aailenm", "martinflory"];

router.get("/api/users", (req, res) => {
  const path = req.path;
  console.log("Request received: ", path);

  return res.send({ users });
});

export { router as usersRouter };