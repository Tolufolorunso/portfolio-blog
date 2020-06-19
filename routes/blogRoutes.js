const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.route("/").get(blogController.getAllPosts);

router.route("/:slug").get(blogController.getAPost);

module.exports = router;
