const Post = require("../models/blogModel");

exports.getAllPosts = async (req, res, next) => {
  let diff;
  try {
    let posts = await Post.find().select("-__v").sort({
      createdAt: -1,
    });

    posts.forEach((post) => {
      diff = new Date() - new Date(post.createdAt);
      const min = Math.round(diff / 1000 / 60);
      const hours = Math.round(min / 60);
      const day = Math.round(hours / 24);
      post.day = day;
    });

    res.status(200).render("blog/posts", {
      posts,
      title: "blog posts",
      time: req.time,
    });
  } catch (error) {
    res.status(404).render("error", {
      title: "Error page",
      error: error.message,
      time: req.time,
    });
  }
};
exports.getAPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).select("-__v");
    diff = new Date() - new Date(post.createdAt);
    const min = Math.round(diff / 1000 / 60);
    const hours = Math.round(min / 60);
    const day = Math.round(hours / 24);
    post.day = day;
    if (!post) {
      return next(new Error("Post is not found"));
    }
    res.status(200).render("blog/singlePost", {
      post,
      title: post.title,
      time: req.time,
    });
  } catch (error) {
    res.status(404).render("error");
  }
};
