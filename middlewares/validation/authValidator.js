import { check } from "express-validator";
import People from "../../models/People.js";

export const registerValidator = [
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("first name is required!")
        .trim(),
    check("lastName")
        .not()
        .isEmpty()
        .withMessage("last name is required!")
        .trim(),
    check("email")
        .custom(async (data) => {
            const find = await People.find({
                email: data,
            });
            if (find.length !== 0) {
                throw new Error("this email already exist!");
            }
        })
        .not()
        .isEmpty()
        .withMessage("email is required!")
        .isEmail()
        .withMessage("this email is not valide!")
        .trim(),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required!")
        .isLength({
            min: 4,
        })
        .withMessage("must be at least 4 chars long"),
];

export const loginValidator = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("email is required!")
        .isEmail()
        .withMessage("this email is not valide!"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required!")
        .trim(),
];
