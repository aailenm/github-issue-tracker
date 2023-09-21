const express = require("express");
const requestHandler = require("../helpers/requestHandler");
const issuesController = require("../issues/controller");

const router = express.Router();

router.get("/api/issues", requestHandler(issuesController.get));

module.exports = router;
