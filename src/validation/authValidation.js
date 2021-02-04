import {check} from "express-validator";

let validateLogin = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password")
        .not().isEmpty()
];

module.exports = {
    validateLogin: validateLogin
};
