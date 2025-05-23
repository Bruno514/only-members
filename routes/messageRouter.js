const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/", messageController.getMessageIndex);
messageRouter.post("/new", authMiddleware, messageController.postMessage);
messageRouter.post(
  "/delete/:id",
  authMiddleware,
  messageController.deleteMessage
);

module.exports = messageRouter;
