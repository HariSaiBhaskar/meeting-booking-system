const express = require("express");
const controller = require("../interface/meeting.controller");
const auth = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, controller.createMeeting);
router.get("/", auth, controller.getMeetings);

module.exports = router;
