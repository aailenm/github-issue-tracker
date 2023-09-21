const express = require("express");

const router = express.Router();
const github = require("../integrations/github");
const _ = require("lodash");

const calculateScore = () => 100;
const calculateRelativeDate = (createdAt) => 9;

router.get("/api/issues", async (req, res) => {
  const path = req.path;
  console.log("Request received: ", path);

  const attributes = ["title", "number", "url", "labels"];
  const rawIssues = await github.getIssues();
  const issues = rawIssues.data.map((issue) => ({
    ..._.pick(issue, attributes),
    score: calculateScore(),
    relativeDateCreated: calculateRelativeDate(issue.created_at),
    opener: issue.user.login,
  }));

  return res.send({ issues });
});

module.exports = router;
