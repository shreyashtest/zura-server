const projectModal = require("../models/project.model");

const addProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    const { userId } = req.params;

    if (!userId) return res.status(400).send("UserId is not present");

    if (!projectName)
      return res.status(400).send("Project name is not present");

    const project = new projectModal({
      projectName,
      userId,
    });
    const data = await project.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).send("UserId is not present");

    const projects = await projectModal.find({ userId });
    res.status(200).send(projects);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { addProject, getProjects };
