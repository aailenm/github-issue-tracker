const _ = require("lodash");
const { calculateWorkingDays } = require("../helpers/workingDaysCalculator");
const UNSCORED = "unscored";

const PRIORITY_LABEL_WEIGHT = {
  "Critical Priority": 1000,
  "High Priority": 50,
  "Mid Priority": 20,
  "Low Priority": 10,
  "Very Low Priority": 1,
};

const rotundaScorer = (issue) => {
  const { labels = [] } = issue;
  if (_.isEmpty(labels)) {
    return UNSCORED;
  }

  const byPriority = (label) =>
    Object.keys(PRIORITY_LABEL_WEIGHT).includes(label.name);
  const toWeight = (label) => PRIORITY_LABEL_WEIGHT[label.name] || 0;

  const weight = _.max(labels.filter(byPriority).map(toWeight));

  if (!weight) {
    return UNSCORED;
  }

  const workingDays = calculateWorkingDays(issue.created_at);
  return weight * workingDays;
};

const createScorer = (strategy) => (issue) => {
  if (strategy) {
    return strategy(issue);
  }

  return rotundaScorer(issue);
};

module.exports = createScorer;
