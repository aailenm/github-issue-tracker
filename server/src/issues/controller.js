const github = require("../integrations/github");
const _ = require("lodash");
const { calculateWorkingDays, defaultScoreCalculation } = require("./utils");

const get = async ({ query }) => {
  const byUser = query.who;

  const attributes = ["title", "number", "url", "labels"];
  const rawIssues = await github.getIssues(byUser);

  return _.orderBy(
    rawIssues.data.map((issue) => ({
      ..._.pick(issue, attributes),
      score: defaultScoreCalculation(issue),
      workingDaysFromCreation: calculateWorkingDays(issue.created_at),
      opener: issue.user.login,
    })),
    "score",
    "desc"
  );
};

module.exports = {
  get,
};
