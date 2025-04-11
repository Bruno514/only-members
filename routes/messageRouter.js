const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.use(authMiddleware);
messageRouter.get("/new", messageController.getMessageNew);
messageRouter.post("/new", messageController.postMessage);

module.exports = messageRouter;
