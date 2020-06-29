const express = require("express");
const router = express.Router();

const adminCrud = require("../controllers/adminCrud");
const { authorize } = require("../middlewares/middleware");

router.get("/", authorize, adminCrud.getAdminDashboard);
router.get("/posts/new", authorize, adminCrud.showForm);
router.get("/posts", adminCrud.getAllPosts);
router.post("/posts", adminCrud.postToDb);
router.get("/posts/:postId/edit", authorize, adminCrud.getPostToEdit);

router.put("/posts/:postId", adminCrud.updatePost);

router.delete("/posts/:postId", adminCrud.deletePost);

module.exports = router;
