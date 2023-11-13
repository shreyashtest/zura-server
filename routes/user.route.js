const { Router } = require("express");
const { login, signUp, editName } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("", login);
userRouter.post("/signup", signUp);
userRouter.patch("/:userId", editName);

module.exports = userRouter;
