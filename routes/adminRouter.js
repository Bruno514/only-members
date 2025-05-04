const { Router } = require("express");
const adminController = require("../controllers/adminController");
const adminRouter = Router();

adminRouter.get("/", adminController.getAdminIndex);
adminRouter.post("/", adminController.adminPost);
adminRouter.get("/success", adminController.getAdminSuccess);

module.exports = adminRouter;
