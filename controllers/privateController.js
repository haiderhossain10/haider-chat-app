import Chat from "../models/Chat.js";
import Conversation from "../models/Conversation.js";
import People from "../models/People.js";

// find all users
export const fetchUsers = async (req, res) => {
    try {
        const findAll = await People.find({}).select("-password -__v");
        res.status(200).json({
            data: findAll,
        });
    } catch (error) {
        res.status(400).json({
            error: "Something error in featch api!",
        });
    }
};

// users chat create
export const chat = async (req, res) => {
    const { msg, to, from } = req.body;
    try {
        await Chat.create({
            msg,
            to,
            from,
        });
        res.status(200).json({
            msg: true,
        });
    } catch (error) {
        res.status(400).json({
            error: "Something error in chat api!",
        });
    }
};
// users chat create
export const chatFetch = async (req, res) => {
    try {
        const find = await Chat.find({
            $or: [
                { to: req.body.to, from: req.body.from },
                { to: req.body.from, from: req.body.to },
            ],
        })
            .populate("to from", "-password")
            .sort({ createdAt: "asc" });
        res.status(200).json({
            data: find,
        });
    } catch (error) {
        res.status(400).json({
            error: "Something error in chat api!",
        });
    }
};

// user online & offline status update
export const userStatus = async (req, res) => {
    const { userId, status } = req.body;
    try {
        await People.findByIdAndUpdate({ _id: userId }, { status });
        res.status(200).json({
            msg: "status updated",
        });
    } catch (error) {
        res.status(400).json({
            error: "Something error in user status api!",
        });
    }
};

// user created conversation
export const userConversation = async (req, res) => {
    const { createdId, withCreatedId } = req.body;
    try {
        const find = await Conversation.find({ createdId, withCreatedId });
        if (find.length === 0) {
            await Conversation.create({ createdId, withCreatedId });
            res.status(200).json({
                msg: true,
            });
        } else {
            res.status(200).json({
                msg: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "Something error in user conversation api!",
        });
    }
};

// user created conversation
export const userConversationFetch = async (req, res) => {
    try {
        const find = await Conversation.find().populate(
            "createdId withCreatedId",
            "-password"
        );
        res.send(find);
    } catch (error) {
        res.status(400).json({
            error: "Something error in user conversation api!",
        });
    }
};
