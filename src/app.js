const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./modules/user/routes/user.routes");
const meetingRoutes = require("./modules/meeting/routes/meeting.routes");

app.use("/", userRoutes);        // /users and /login inside
app.use("/meetings", meetingRoutes);
app.get("/", (req, res) => {
  res.send("Meeting Booking API is running 🚀");
});


module.exports = app;

