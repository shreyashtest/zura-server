const { default: mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const projectModal = mongoose.model("project", projectSchema);

module.exports = projectModal;
