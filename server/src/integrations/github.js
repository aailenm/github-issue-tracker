const { Octokit } = require("octokit");
const octokit = new Octokit({});

const repo = process.env.REPO_NAME;
const owner = process.env.ORGANIZATION;

const getUsers = async () => {
  return octokit.request("GET /repos/{owner}/{repo}/assignees", {
    repo,
    owner,
  });
};

const getIssues = async () => {
    return octokit.request("GET /repos/{owner}/{repo}/issues", {
        repo,
        owner
    })
}
module.exports = { getUsers, getIssues };
