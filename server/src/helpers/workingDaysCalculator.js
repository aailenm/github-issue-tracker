const _ = require("lodash");

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
};
