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

module.exports = router;
