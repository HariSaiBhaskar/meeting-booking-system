const express = require("express");
const sequelize = require("./config/database");

const User = require("./modules/user/model/user.model");
const Meeting = require("./modules/meeting/model/meeting.model");

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });

const userRoutes = require("./modules/user/routes/user.routes");
const meetingRoutes = require("./modules/meeting/routes/meeting.routes");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

sequelize.sync().then(() => console.log("DB Ready"));

module.exports = app;
