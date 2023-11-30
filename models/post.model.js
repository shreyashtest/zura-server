const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    post: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kennetuser",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true, versionKey: false }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
