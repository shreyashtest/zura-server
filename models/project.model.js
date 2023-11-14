const { default: mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  botImage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFQolqmgNtMjNW9kS-CApwChIYSIY_pdyjB0pYbk&s",
  },
});

const projectModal = mongoose.model("project", projectSchema);

module.exports = projectModal;
