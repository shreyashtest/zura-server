const { Router } = require("express");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const taskRouter = Router();

taskRouter
  .route("/:projectId")
  .post(addTask)
  .get(getTasks)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
