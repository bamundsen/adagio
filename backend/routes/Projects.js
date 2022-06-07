const express = require("express");
const router = express.Router();
const { Projects, Tasks } = require("../models");

router.get("/", async (req, res) => {
  const listOfProjects = await Projects.findAll();

  res.json(listOfProjects);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const project = await Projects.findByPk(parseInt(id));

    res.json(project);
  } catch (erro) {}
});

router.get("/:id/tasks", async (req, res) => {
  const id = req.params.id;

  const tasksOfProject = await Tasks.findAll({
    where: { projectCod: parseInt(id) },
  });

  res.json(tasksOfProject);
});

router.get("/:id/tasks/:idTask", async (req, res) => {
  const id = req.params.id;
  const idTask = req.params.idTask;

  const tasksOfProject = await Tasks.findAll({
    where: { projectCod: parseInt(id), id: parseInt(idTask) },
  });

  res.json(tasksOfProject);
});

router.post("/", async (req, res) => {
  try {
    const project = req.body;

    await Projects.create(project);

    res.json(project);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
