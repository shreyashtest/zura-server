const postModel = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "kennetuser",
        },
      })
      .populate("userId");

    return res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).send("All fileds are not present");

    const posts = await postModel
      .find({
        post: { $regex: new RegExp(text, "i") },
      })
      .populate("userId")
      .sort({ createdAt: 1 });

    return res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { post } = req.body;
    const { userId } = req.params;

    if (!post || !userId)
      return res.status(400).send("All fileds are not present");

    const newPost = new postModel({ post, userId });
    await newPost.save();

    const data = await newPost.populate("userId");

    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getPosts, addPost, searchPosts };
