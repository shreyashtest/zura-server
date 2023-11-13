const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskName: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const taskModal = mongoose.model("task", taskSchema);

module.exports = taskModal;
