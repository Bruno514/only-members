const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/new", messageController.getMessageNew);

module.exports = messageRouter;
