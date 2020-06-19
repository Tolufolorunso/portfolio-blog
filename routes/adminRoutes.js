const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
// const { authorize } = require("../middlewares/middleware");

// router.route("/").get(adminController.getAdminPage);
router
  .route("/login")
  .get(adminController.getLoginForm)
  .post(adminController.login);

router.post("/signup", adminController.signup);
router.post("/logout", adminController.logout);

module.exports = router;
