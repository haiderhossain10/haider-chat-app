import express from "express";
import {
    chat,
    chatFetch,
    fetchUsers,
    userConversation,
    userConversationFetch,
    userStatus,
} from "../controllers/privateController.js";
const privateRoute = express.Router();

privateRoute.get("/user/fetch-users", fetchUsers);
privateRoute.post("/user/chat", chat);
privateRoute.post("/user/chat/fetch", chatFetch);
privateRoute.put("/user/status", userStatus);
privateRoute.post("/user/conversation", userConversation);
privateRoute.get("/user/conversation/fetch", userConversationFetch);

export default privateRoute;
