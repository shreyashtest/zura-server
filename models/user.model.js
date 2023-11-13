const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const userModal = mongoose.model("user", userSchema);

module.exports = userModal;
