const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const projectModal = require("../models/project.model");
const dotenv = require("dotenv");
const s3 = require("../config/aws");
dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;

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

const botImage = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const name = uuidv4();
    const params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const imageUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${name}`;
    const botImage = await projectModal.findByIdAndUpdate(
      projectId,
      { botImage: imageUrl },
      { new: true }
    );

    res.status(200).send(botImage);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const singleProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) return res.status(400).send("projectId is not present");

    const project = await projectModal.findById(projectId);
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { addProject, getProjects, botImage, singleProject };
