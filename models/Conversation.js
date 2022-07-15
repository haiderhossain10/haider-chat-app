import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        createdId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
        },
        withCreatedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Conversation", ConversationSchema);
