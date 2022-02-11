// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();

router.get("", (req, res) => {
  Actions.get(req.params.id)

    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving the Actions" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((project) => {
      if (!id || project === null) {
        res
          .status(404)
          .json({ message: "There is no action with id you are looking ☹️" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({
          message: "Error retrieving the  action with the specific id ❌",
        });
    });
});

router.post("", (req, res) => {
  const { notes, description, project_id } = req.body;

  if (!notes || !description || !project_id) {
    res.status(400).json({ message: " required fields missing 📝" });
    return;
  }
  Actions.insert(req.body)
    .then((postAction) => {
      res.status(201).json(postAction);
    })
    .catch(() => {
      res.status(500).json({ message: "Error on adding the project ❌" });
    });
});

router.put("/:id", (req, res) => {
  const updates = req.body;

  if (
    !updates.notes ||
    !updates.description ||
    !updates.project_id ||
    typeof updates.completed !== "boolean"
  ) {
    res.status(400).json({
      message: "Missing notes ,description,completed  or project_id🧐",
    });
    return;
  }
  Actions.update(req.params.id, updates)
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error updating the action ",
      });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((deleteAction) => {
      if (!deleteAction) {
        res.status(404).json({ message: "Action not found 🙄" });
      } else {
        res.status(200).json(deleteAction);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Error deleting the Action ❌",
      });
    });
});
module.exports = router;
