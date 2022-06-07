module.exports = (sequelize, dataTypes) => {
  const Notifications = sequelize.define("Notifications", {
    category: {
      type: dataTypes.ENUM("EMAIL", "SMS", "NOTIFICATION_BELL"),
      allowNull: false,
    },
    notificationMoment: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Tasks, {
      foreignKey: "taskFk",
    });
  };

  return Notifications;
};
