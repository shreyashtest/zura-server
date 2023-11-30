const userModel = require("../models/kennetuser.model");

const signUp = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).send("All fileds are not present");

    const findUser = await userModel.findOne({ name });

    if (findUser)
      return res.status(409).send({ messsage: "user already exist" });

    const user = new userModel({ name });
    await user.save();

    res.status(201).send({
      _id: user._id,
      name: user.name,
    });
  } catch (error) {
    res.status(400).send({
      message: "user not created",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).send("All fileds are not present");

    const findUser = await userModel.findOne({ name });

    if (!findUser)
      return res.status(400).send({ message: "user does not exist" });

    res.status(200).send({
      _id: findUser._id,
      name,
    });
  } catch (error) {
    res.status(400).send({ message: "login failed", error: error.message });
  }
};

module.exports = { signUp, login };
