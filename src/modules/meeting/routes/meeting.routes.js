const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth.middleware");

let meetings = [];

router.post("/", auth, (req, res) => {
  const { title, startTime, endTime } = req.body;
  const userId = req.user.id;

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end)
    return res.status(400).json({ message: "Invalid meeting time range" });

  // 🔥 CONFLICT CHECK ONLY FOR SAME USER
  const conflict = meetings.find(m =>
    m.userId === userId &&
    new Date(m.startTime) < end &&
    new Date(m.endTime) > start
  );

  if (conflict)
    return res.status(400).json({ message: "Meeting time conflict detected" });

  const meeting = {
    id: meetings.length + 1,
    title,
    startTime,
    endTime,
    userId
  };

  meetings.push(meeting);

  res.status(201).json({
    message: "Meeting created successfully",
    meeting
  });
});

module.exports = router;
