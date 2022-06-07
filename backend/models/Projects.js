module.exports = (sequelize, dataTypes) => {
  const Projects = sequelize.define("Projects", {
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
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
    ended: {
      type: dataTypes.BOOLEAN,
      allowNull: true,
    },

    progress: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
  });

  Projects.associate = (models) => {
    // Projects.hasMany(models.Tasks, {
    //   onDelete: "cascade",
    //   allowNull: true,
    // });

    Projects.belongsTo(models.Users, {
      foreignKey: "userFk",
    });
  };
  return Projects;
};
