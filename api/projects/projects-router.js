// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const router = express.Router();

router.get("", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving the projects ❗️" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (!id || project === null) {
        res
          .status(404)
          .json({ message: "There is no project with id you are looking ☹️" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({
          message: "Error retrieving the project with the specific id ❗️",
        });
    });
});

router.post("", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: " required fields missing" });
    return;
  }

  Projects.insert(req.body)
    .then((postProject) => {
      res.status(201).json(postProject);
    })
    .catch(() => {
      res.status(500).json({ message: "Error on posting a ne project ❗️" });
    });
});
router.put("/:id", (req, res) => {
  const changes = req.body;

  if (
    !changes.name ||
    !changes.description ||
    typeof changes.completed !== "boolean"
  ) {
    res
      .status(400)
      .json({ message: "Missing name ,description or completed ❗️" });
    return;
  }
  Projects.update(req.params.id, changes)
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error updating the project ❗️",
      });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((deleteProject) => {
      if (!deleteProject) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(deleteProject);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Error deleting the project ❗️",
      });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error getting the action ❗️",
      });
    });
});

module.exports = router;
