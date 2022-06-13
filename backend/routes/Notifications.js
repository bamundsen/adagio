const express = require("express");
const router = express.Router();
const { Notifications } = require("../models");

router.get("/", async (req, res) => {
  const listOfNotifications = await Notifications.findAll();

  res.json(listOfNotifications);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const notification = await Notifications.findByPk(parseInt(id));

    res.json(notification);
  } catch (erro) {}
});

router.post("/", async (req, res) => {
  try {
    const notification = req.body;

    await Notifications.create(notification);

    res.json(notification);
  } catch (err) {}
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notificationBody = req.body;

    const notification = await Notifications.findByPk(parseInt(id));

    if (notification) {
      Notifications.update(notificationBody, {
        where: {
          id: id,
        },
      });
    }

    res.json({ notification });
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const notification = await Notifications.findByPk(parseInt(id));

    if (notification) {
      await Notifications.destroy({
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
