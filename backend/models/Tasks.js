module.exports = (sequelize, dataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    startDateTime: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: dataTypes.ENUM("LOW", "AVERAGE", "HIGH", "CRITICAL"),
      allowNull: false,
    },
    ended: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  Tasks.associate = (models) => {
    // Tasks.hasMany(models.Notifications, {
    //   onDelete: "cascade",
    // });

    Tasks.belongsTo(models.Projects, {
      foreignKey: "projectCod",
      allowNull: true,
    });

    Tasks.belongsTo(models.Users, {
      foreignKey: "userFk",
    });
  };
  return Tasks;
};
