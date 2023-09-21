const _ = require("lodash");

const UNSCORED = "unscored";

const PRIORITY_LABEL_WEIGHT = {
  "Critical Priority": 1000,
  "High Priority": 50,
  "Mid Priority": 20,
  "Low Priority": 10,
  "Very Low Priority": 1,
};

const defaultScoreCalculation = (issue) => {
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

const calculateWorkingDays = (date) => {
  if (!date) throw Error("Date not provided");

  const today = new Date();
  const pastDate = new Date(date);

  let counter = 0;

  while (today >= pastDate) {
    if (pastDate.getDay() <= 5 && pastDate.getDay() >= 1) {
      counter += 1;
    }
    pastDate.setDate(pastDate.getDate() + 1);
  }
  return counter;
};

module.exports = {
  calculateWorkingDays,
  defaultScoreCalculation,
};
