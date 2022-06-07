module.exports = (sequelize, dataTypes) => {
  const Users = sequelize.define("Users", {
    login: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
