const express = require("express");

const router = express.Router();

const issues = [
  {
    score: 110,
    title: "something happened",
    number: "1234",
    relativeDateCreated: "7 days",
    opener: "martinflory",
    labels: [
      { name: "Unison", color: "yellow" },
      { name: "High Priority", color: "red" },
      { name: "Mobile", color: "blue" },
    ],
  },
  {
    score: 80,
    title: "another thing happened",
    number: "1235",
    relativeDateCreated: "5 days",
    opener: "martinflory",
    labels: [
      { name: "Unison", color: "yellow" },
      { name: "Low Priority", color: "green" },
      { name: "Mobile", color: "blue" },
    ],
  },
];

router.get("/api/issues", (req, res) => {
  const path = req.path;
  console.log("Request received: ", path);

  return res.send({ issues });
});

export { router as issuesRouter };