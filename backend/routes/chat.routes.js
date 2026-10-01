import express from "express";
import isAuth from "../middleware/isAuth.js";
import {createConversation,sendMessage,getMessages,getMyConversations
} from "../controllers/chat.controller.js";

let chatRouter = express.Router();

chatRouter.post("/conversation", isAuth, createConversation);
chatRouter.post("/message", isAuth, sendMessage);
chatRouter.get("/messages/:conversationId", isAuth, getMessages);
chatRouter.get("/conversations", isAuth, getMyConversations);

export default chatRouter;