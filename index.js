const express = require("express");
var cors = require("cors");
const connect = require("./config/db");
// const userRouter = require("./routes/user.route");
const projectRouter = require("./routes/project.route");
const taskRouter = require("./routes/task.route");
const dotenv = require("dotenv");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");
const userRouter = require("./routes/kennetuser.route");
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/auth", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);
app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.listen(PORT, async () => {
  try {
    await connect;
    console.log("connetion to db success");
  } catch (error) {
    console.log(error.message);
  }
  console.log("app is listning");
});
