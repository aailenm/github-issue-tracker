const github = require("../integrations/github");
const _ = require("lodash");

const get = async () => {
  const rawUsers = await github.getUsers();
  return rawUsers.data.map((user) => user.login);
};

module.exports = {
  get,
};
