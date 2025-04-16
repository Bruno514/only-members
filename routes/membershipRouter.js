const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const membershipRouter = Router();

membershipRouter.get("/", membershipController.getMembershipIndex);
membershipRouter.post("/", membershipController.membershipPost);
membershipRouter.get("/success", membershipController.getMembershipSuccess);

module.exports = membershipRouter;
