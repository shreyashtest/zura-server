const { Router } = require("express");
const addComment = require("../controllers/comment.controller");

const commentRouter = Router();

commentRouter.post("", addComment);

module.exports = commentRouter;
