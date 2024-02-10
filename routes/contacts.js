const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");
const schemas = require("../helpers/validate.js");
const middleware = require("../middleware/validate.js");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", schemas.contactValidator, middleware.isDataValidated, contactsController.createUser);

router.put("/:id", contactsController.updateUser);

router.delete("/:id", contactsController.deleteUser);

// router.post("/", (req, res) => {
//     console.log(req.query.name),
//     res.send(req.body);
// });

module.exports = router;