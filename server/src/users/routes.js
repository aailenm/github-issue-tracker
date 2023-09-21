const express = require("express");
const requestHandler = require("../helpers/requestHandler");
const userController = require("../users/controller");

const router = express.Router();

router.get("/api/users", requestHandler(userController.get));

module.exports = router;
