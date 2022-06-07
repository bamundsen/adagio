const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  validateToken,
  verifyIfIsAuthenticatedAndReturnData,
} = require("./middlewares/AuthMiddleware");

require("dotenv").config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Routers
const projectRouter = require("./routes/Projects");
const taskRouter = require("./routes/Tasks");
const notificationRouter = require("./routes/Notifications");
const userRouter = require("./routes/Users");

app.use("/auth", userRouter);

app.get(
  "/verifiyIfIsAuthenticatedAndReturn",
  verifyIfIsAuthenticatedAndReturnData
);

app.use(validateToken);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/notifications", notificationRouter);

db.sequelize.sync().then(() => {
  const PORT = 8092;
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
