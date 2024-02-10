const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/", schemas.userValidator, middleware.isDataValidated, usersController.createUser);

module.exports = router;