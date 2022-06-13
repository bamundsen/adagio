const express = require("express");
const router = express.Router();
const { Tasks, Notifications } = require("../models");

router.get("/", async (req, res) => {
  const listOfTasks = await Tasks.findAll({
    where: { id: null },
  });

  res.json(listOfTasks);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Tasks.findByPk(parseInt(id));

    res.json(task);
  } catch (erro) {}
});

router.get("/:id/notifications", async (req, res) => {
  const id = req.params.id;

  const notificationsOfTask = await Notifications.findAll({
    where: { taskFk: parseInt(id) },
  });

  res.json(notificationsOfTask);
});

router.get("/:id/notifications/:idNotification", async (req, res) => {
  const id = req.params.id;
  const idNotification = req.params.idNotification;

  const notificationsOfTask = await Notifications.findAll({
    where: { taskFk: parseInt(id), id: parseInt(idNotification) },
  });

  res.json(notificationsOfTask);
});

router.post("/", async (req, res) => {
  try {
    const task = req.body;

    await Tasks.create(task);

    res.json(task);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const taskBody = req.body;

    const task = await Tasks.findByPk(parseInt(id));

    if (task) {
      await Tasks.update(taskBody, {
        where: {
          id: id,
        },
      });
    }
    res.json({ task });
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Tasks.findByPk(parseInt(id));

    if (task) {
      await Tasks.destroy({
        where: {
          id: id,
        },
      });
    }

    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
});

module.exports = router;
