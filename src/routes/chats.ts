import { Router } from "express";
import { listChats, createChat, getChatById, deleteChat, sendMessage } from "../controllers/chats.js";
import { auth } from "../middleware/auth.js";

const chatsRouter = Router();
chatsRouter.use(auth);
chatsRouter.get("/", listChats);
chatsRouter.post("/", createChat);
chatsRouter.get("/:id", getChatById);
chatsRouter.delete("/:id", deleteChat);
chatsRouter.post("/:id/messages", sendMessage);

export { chatsRouter };
