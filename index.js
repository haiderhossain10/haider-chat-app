import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import db from "./db/db.js";
import authRoute from "./routes/authRoute.js";
import privateRoute from "./routes/privateRoute.js";
const app = express();

// all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// connect db
db(process.env.MONGO_DB);

// all api routes
app.use("/api/v1/", authRoute);
app.use("/api/v1/", privateRoute);

// localhost server
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "development") {
    app.listen(port, () => {
        console.log("this port listening on http://localhost:" + port);
    });
} else if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("client", "build")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(path.join("client", "build", "index.html")));
    });
    app.listen(port, () => {
        console.log("this port listening on http://localhost:" + port);
    });
}
