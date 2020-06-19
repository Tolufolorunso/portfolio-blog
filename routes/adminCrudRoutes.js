const express = require("express");
const router = express.Router();

const adminCrud = require("../controllers/adminCrud");
const { authorize } = require("../middlewares/middleware");

router.get("/", authorize, adminCrud.getAdminDashboard);
router.get("/posts/new", authorize, adminCrud.showForm);
router.get("/posts", adminCrud.getAllPosts);
router.post("/posts", adminCrud.postToDb);
router.delete("/posts/:postId", adminCrud.deletePost);

module.exports = router;
