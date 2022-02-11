// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProjectsId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project || project.null) {
      res.status(404).json({ message: " project not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: " Error finding the user" });
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || typeof completed !== "boolean") {
    res
      .status(400)
      .json({ message: "Missing name ,description or completed ❗️" });
  } else {
    req.name = name;
    req.description = description;
    req.completed = completed;
    next();
  }
}

module.exports = {
  validateProjectsId,
  validateProject,
};
