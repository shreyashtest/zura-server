const { Router } = require("express");
const {
  addProject,
  getProjects,
} = require("../controllers/project.controller");

const projectRouter = Router();

projectRouter.route("/:userId").post(addProject).get(getProjects);

module.exports = projectRouter; 
