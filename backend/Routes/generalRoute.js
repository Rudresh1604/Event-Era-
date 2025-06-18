const express = require("express");
const {
  registerForEvent,
  fetchAllEvents,
  accessEvent,
} = require("../controller/studentController");
const { sponsorUsController } = require("../controller/sponsorController");
const router = express.Router();

router.route("/student/register").post(registerForEvent);
router.route("/student/events/").get(fetchAllEvents);
router.route("/student/access/event").get(accessEvent);
router.route("/sponsor").post(sponsorUsController);

module.exports = router;
