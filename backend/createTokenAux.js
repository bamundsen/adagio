const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    {
      id: user.id,
      name: user.name,
      login: user.login,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  return accessToken;
};

module.exports = {
  createToken,
};
