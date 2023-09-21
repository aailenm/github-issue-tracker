import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const ISSUES_PATH = "/issues";
const USERS_PATH = "/users";

const extractData = (res) => res.data;
const handleError = (error) => {
  console.log("Something went wrong: ", error);
  return [];
};

const makeGetRequest = (url) => {
  return axios.get(url).then(extractData).catch(handleError);
};

const getIssues = (user) => {
  const filterByUser = user ? `?who=${user}` : ``;

  return makeGetRequest(`${BASE_URL}${ISSUES_PATH}${filterByUser}`);
};

const getUsers = () => {
  return makeGetRequest(`${BASE_URL}${USERS_PATH}`);
};

export default {
  getIssues,
  getUsers,
};
