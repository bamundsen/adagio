const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(400).json({
      error: "User not authenticated",
    });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    console.log("PAYLOAD: ", validToken);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const verifyIfIsAuthenticatedAndReturnData = (req, res) => {
  const accessToken = req.header("accessToken");
  // console.log(req);
  if (accessToken) {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    // console.log("PAYLOAD: ", validToken);

    if (validToken) {
      res.status(200).json({
        userData: validToken,
      });
    }
  } else {
    res.status(400).json({
      messageNotAuthenticated: "User not authenticated",
    });
  }
};
module.exports = { validateToken, verifyIfIsAuthenticatedAndReturnData };
