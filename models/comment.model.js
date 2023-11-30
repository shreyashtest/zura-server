const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kennetuser",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
