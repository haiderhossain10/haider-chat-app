import mongoose from "mongoose";

const PeopleSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        status: {
            type: String,
            enum: ["ONLINE", "OFFLINE"],
            default: "OFFLINE",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("People", PeopleSchema);
