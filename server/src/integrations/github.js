/** API Docs: https://octokit.github.io/rest.js/v20 */
const { Octokit } = require("octokit");
const octokit = new Octokit({});

const repo = process.env.REPO_NAME;
const owner = process.env.ORGANIZATION;

/**
 * Retrieve a list of users that belongs to an organization
 * @returns A list of github users
 * @throws If the API rate limit is exceeded or if there are network issues. Currently, rate limits are 60 requests per hour
 */
const getUsers = async () => {
  return octokit.request("GET /repos/{owner}/{repo}/assignees", {
    repo,
    owner,
  });
};

/**
 * Retrieve a list of open issues related to a repository, optionally filtered by a user
 * @param byUser - The username to filter issues by. If not provided, all issues will be returned
 * @returns A list of open issues 
 * @throws If the API rate limit is exceeded or if there are network issues. Currently, rate limits are 60 requests per hour
 */
const getIssues = async (byUser) => {
  return octokit.paginate("GET /repos/{owner}/{repo}/issues", {
    repo,
    owner,
    ...(byUser ? { assignee: byUser } : {}),
    per_page: 100,
    request: { retries: 3, retryAfter: 2 },
  });
};
module.exports = { getUsers, getIssues };
