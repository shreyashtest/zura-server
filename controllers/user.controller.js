const userModal = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).send("All fileds are not present");

    const findUser = await userModal.findOne({ email });

    if (findUser)
      return res.status(409).send({ messsage: "user already exist" });

    const user = new userModal({ name, email });
    await user.save();

    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.send({
      message: "user not created",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name)
      return res.status(400).send("All fileds are not present");

    const findUser = await userModal.findOne({ email });

    if (!findUser)
      return res.status(400).send({ message: "user does not exist" });

    if (findUser.name !== name)
      return res.status(400).send({ message: "wrond credentials" });

    res.status(200).send({
      _id: findUser._id,
      name,
      email,
    });
  } catch (error) {
    res.status(400).send({ message: "login failed", error: error.message });
  }
};

const editName = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).send("taskId is not present");

    const user = await userModal.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { signUp, login, editName };
