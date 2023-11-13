const multer = require("multer");
const { Router } = require("express");
const {
  addProject,
  getProjects,
  botImage,
} = require("../controllers/project.controller");

const projectRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

projectRouter.route("/:userId").post(addProject).get(getProjects);
projectRouter.post("/botimage/:projectId", upload.single("image"), botImage);

module.exports = projectRouter;
