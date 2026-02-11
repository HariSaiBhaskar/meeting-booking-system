const service = require("../service/meeting.service");

exports.createMeeting = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;   // from JWT

    const meeting = await service.createMeeting(data);

    res.status(201).json({
      message: "Meeting created successfully",
      meeting
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
