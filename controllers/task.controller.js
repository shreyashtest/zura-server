const taskModal = require("../models/task.model");

const addTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskName, description } = req.body;

    if (!taskName || !description)
      return res.status(400).send("All fields are not present");

    if (!projectId) return res.status(400).send("ProjectId is not present");

    const task = new taskModal({ taskName, description, projectId });
    const data = await task.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return res.status(400).send("ProjectId is not present");

    const tasks = await taskModal.find({ projectId }).populate("projectId");
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.projectId;
    if (!taskId) return res.status(400).send("taskId is not present");

    const task = await taskModal.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.projectId;
    if (!taskId) return res.status(400).send("taskId is not present");

    const task = await taskModal.findByIdAndDelete(taskId);
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
