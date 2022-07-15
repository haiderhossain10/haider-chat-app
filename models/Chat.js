import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        msg: String,
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
        },
        seen: {
            type: String,
            enum: ["SEEN", "UNSEEN"],
            default: "UNSEEN",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Chat", ChatSchema);
