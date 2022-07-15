import express from "express";
import { login, register } from "../controllers/authController.js";
import {
    loginValidator,
    registerValidator,
} from "../middlewares/validation/authValidator.js";
const authRoute = express.Router();

authRoute.post("/registration", registerValidator, register);
authRoute.post("/login", loginValidator, login);

export default authRoute;
