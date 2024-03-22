import {body} from "express-validator"

export const validateSignup = [
  body("username").isString().isLength({ min: 4 }),
  body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/),
  body("role").isString(),
];
