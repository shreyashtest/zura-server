const { Router } = require("express");
const {
  addPost,
  getPosts,
  searchPosts,
} = require("../controllers/post.controller");

const postRouter = Router();

postRouter.post("/search", searchPosts);
postRouter.post("/:userId", addPost);
postRouter.get("", getPosts);

module.exports = postRouter;
