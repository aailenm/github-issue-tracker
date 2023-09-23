const github = require("../integrations/github");
const _ = require("lodash");
const { calculateWorkingDays } = require("../helpers/workingDaysCalculator");
const createScorer = require('../scorer');

const calculateScore = createScorer();

const get = async ({ query }) => {
  const byUser = query.who;

  const attributes = ["title", "number", "labels"];
  const rawIssues = await github.getIssues(byUser);
  const issuesWithCalculatedValues = rawIssues.data.map((issue) => ({
    ..._.pick(issue, attributes),
    score: calculateScore(issue),
    workingDaysFromCreation: calculateWorkingDays(issue.created_at),
    opener: issue.user.login,
    url: issue.html_url,
  }));

  const [unscored, scored] = _.partition(issuesWithCalculatedValues, i => i.score === 'unscored');

  return [...unscored, ..._.orderBy(scored, "score", "desc")];
};

module.exports = {
  get,
};
