const { Op } = require("sequelize");
const sequelize = require("../../../config/database");
const Meeting = require("../model/meeting.model");
const User = require("../../user/model/user.model");

/* ================= CREATE MEETING ================= */
async function createMeeting(data) {
  if (!data.title || !data.startTime || !data.endTime || !data.userId) {
    throw new Error("Missing required meeting fields");
  }

  const user = await User.findByPk(data.userId);
  if (!user) throw new Error("User does not exist");

  const start = new Date(data.startTime);
  const end = new Date(data.endTime);

  if (start >= end) throw new Error("Invalid meeting time range");

  const conflict = await Meeting.findOne({
    where: {
      userId: data.userId,  // ✅ FIXED
      startTime: { [Op.lt]: data.endTime },
      endTime: { [Op.gt]: data.startTime }
    }
  });

  if (conflict) throw new Error("Meeting time conflict detected");

  return await sequelize.transaction(async (t) => {
    return await Meeting.create(
      {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        userId: data.userId   // ✅ FIXED
      },
      { transaction: t }
    );
  });
}
/* ================= GET ALL ================= */
async function getAllMeetings() {
  return await Meeting.findAll();
}

/* ================= GET ONE ================= */
async function getMeetingById(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error("Meeting not found");
  return meeting;
}

/* ================= GET WITH USERS (JOIN) ================= */
async function getMeetingsWithUsers() {
  return await Meeting.findAll({
    include: {
      model: User,
      attributes: ["id", "name", "email"]
    }
  });
}

/* ================= UPDATE MEETING ================= */
async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) throw new Error("Meeting not found");

  const allowedFields = ["title", "startTime", "endTime"];
  allowedFields.forEach(field => {
    if (data[field] !== undefined) meeting[field] = data[field];
  });

  const start = new Date(meeting.startTime);
  const end = new Date(meeting.endTime);

  if (start >= end) {
    throw new Error("Invalid meeting time range");
  }

  // 🚫 CONFLICT CHECK (exclude itself)
  const conflict = await Meeting.findOne({
    where: {
      UserId: meeting.UserId,
      id: { [Op.ne]: id },
      startTime: { [Op.lt]: meeting.endTime },
      endTime: { [Op.gt]: meeting.startTime }
    }
  });

  if (conflict) {
    throw new Error("Meeting time conflict detected");
  }

  await meeting.save();
  return meeting;
}

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  getMeetingsWithUsers,
  updateMeeting
};
