import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import People from "../models/People.js";

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await People.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
        });
        res.status(201).json({
            msg: "you have created an account successfully!",
        });
    } catch (error) {
        res.status(400).json({
            msg: "something error in register!",
        });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const find = await People.findOne({
            email: req.body.email,
        });
        if (find) {
            const hashMatching = await bcrypt.compare(
                req.body.password,
                find["password"]
            );
            if (hashMatching) {
                const token = jwt.sign(
                    {
                        id: find["_id"],
                        firstName: find["firstName"],
                        lastName: find["lastName"],
                        email: find["email"],
                    },
                    process.env.SECRET_KEY
                );
                res.status(200).json({
                    token: token,
                    msg: "you are login succesfully!",
                });
            } else {
                res.status(400).json({
                    msg: "your given info is not matched!",
                });
            }
        } else {
            res.status(400).json({
                msg: "your given info is not matched!",
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "something error in login!",
            error: error,
        });
    }
};
