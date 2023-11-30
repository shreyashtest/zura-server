const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

const addComment = async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;

    if (!userId || !postId || !comment)
      return res.status(400).send("All fileds are not present");

    const { parentId } = req.body;

    var newcomment = new commentModel({ comment, userId, postId });
    await newcomment.save();

    await postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: newcomment._id } },
      { new: true }
    );

    return res.status(201).send(newcomment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = addComment;
