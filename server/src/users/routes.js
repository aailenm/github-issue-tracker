const express = require("express");
const github = require('../integrations/github');

const router = express.Router();

router.get("/api/users", async (req, res) => {
  const path = req.path;
  console.log("Request received: ", path);

  const rawUsers = await github.getUsers();
  const users = rawUsers.data.map(user => user.login);

  return res.send({ users });
});

module.exports = router;