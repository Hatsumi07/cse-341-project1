const { body, validationResult } = require("express-validator");

const userValidator = [
    body("email", "wrong email")
    .exists()
    .isEmail(),
    body("username", "wrong username")
    .exists(),
    body("name", "wrong name")
    .exists(),
    body("ipaddress", "wrong ip address")
    .exists()
    .isNumeric()
  ]

  const contactValidator = [
    body("firstName", "first name is required")
    .exists(),
    body("firstName", "Must be a string")
    .isString(),
    body("lastName", "last name is required")
    .exists(),
    body("lastName", "Must be a string")
    .isString(),
    body("email", "Email is required")
    .exists(),
    body("email", "wrong email format")
    .isEmail(),
    body("favoriteColor", "favorite color is required")
    .exists(),
    body("favoriteColor", "Must be a string")
    .isString(),
    body("birthday", "Birthday must be a string")
    .optional()
    .isString()
  ]

module.exports = {
    userValidator,
    contactValidator
}