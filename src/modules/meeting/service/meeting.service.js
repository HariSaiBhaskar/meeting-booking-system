const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function createMeeting(data) {
  if (!data.title || !data.startTime || !data.endTime || !data.userId)
    throw new Error("Missing required meeting fields");

  const start = new Date(data.startTime);
  const end = new Date(data.endTime);

  if (start >= end) throw new Error("Invalid meeting time range");

  // 🔥 CONFLICT CHECK ONLY FOR SAME USER
  const conflict = await Meeting.findOne({
    where: {
      userId: data.userId,
      startTime: { [Op.lt]: data.endTime },
      endTime: { [Op.gt]: data.startTime }
    }
  });

  if (conflict)
    throw new Error("Meeting time conflict detected");

  return await Meeting.create({
    title: data.title,
    startTime: data.startTime,
    endTime: data.endTime,
    userId: data.userId
  });
}

module.exports = { createMeeting };
