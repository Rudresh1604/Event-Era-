const express = require("express");
const router = express.Router();
const {
  adminLoginController,
  registerAdminController,
  allUserController,
} = require("../controller/adminController");
const {
  createClub,
  accessClub,
  fetchClubs,
} = require("../controller/clubController");
const {
  createEvent,
  accessEvent,
  fetchAllEvents,
  deleteEvent,
} = require("../controller/eventController");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  removeUserFromGroupChat,
} = require("../controller/chatController");
const { sendMessage, allMessages } = require("../controller/messageController");

const protect = require("../middleware/authMiddleware");

router.route("/login").post(adminLoginController);
router.route("/register").post(registerAdminController);
router.route("/club/details").post(accessClub);
router.route("/club/create").post(protect, createClub);
router.route("/club").get(protect, fetchClubs);
router.route("/event/create").post(protect, createEvent);
router.route("/event/data").post(protect, accessEvent);
router.route("/event/delete").delete(deleteEvent);
router.route("/event/all").get(fetchAllEvents);

// to create a chat
router.route("/chats/search").get(protect, allUserController);
router.route("/chats").post(protect, accessChat);
router.route("/chats").get(protect, fetchChats);
// create a group chat
router.route("/chats/group").post(protect, createGroupChat);
// rename a group
router.route("/chats/rename").put(protect, renameGroupChat);
// remove from a group
router.route("/chats/removefromgroup").put(protect, removeUserFromGroupChat);
// add to a group
router.route("/chats/addtogroup").put(protect, addToGroupChat);

router.route("/message").post(protect, sendMessage);
// to fetch all message of a chat
router.route("/message/:chatId").get(protect, allMessages);

module.exports = router;
