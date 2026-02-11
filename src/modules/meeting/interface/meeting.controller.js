const meetingService = require("../service/meeting.service");

exports.createMeeting = async (req, res) => {
  try {
    const meeting = await meetingService.createMeeting({
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      userId: req.user.id   // ✅ THIS NOW MATCHES MODEL
    });

    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getMeetings = async (req, res) => {
  try {
    const meetings = await meetingService.getAllMeetings();
    res.json(meetings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
