const { Club } = require("../models/clubModel");
const User = require("../models/userModel");

const accessClub = async (req, res) => {
  try {
    const { clubId } = req.body;
    // console.log(userId);

    if (!clubId) {
      console.log("clubId param not sent with request");
      return res.sendStatus(400);
    }

    var isClub = await Club.findById(clubId)
      .populate("events")
      .populate("latestEvent")
      .populate("president", "-password");
    console.log(isClub);
    console.log("acceess club");

    if (!isClub) {
      res.status(400).send("Oops Something went wrong !");
    }
    res.status(200).send(isClub);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// create a club
const createClub = async (req, res) => {
  const { clubName, description, secretKey, president, userId } = req.body;
  try {
    console.log("create club req");

    if (!clubName || !description || !secretKey || !president) {
      return res.status(400).send("All fields are required !");
    }
    let user = await User.findById(userId);
    if (!user.isMainAdmin) {
      return res.status(400).send("Access denied !");
    }
    user = await User.findOne({ name: president });
    if (!user) {
      return res.status(400).send("Invalid Name of President");
    }
    const club = await Club.create({
      clubName,
      secretKey,
      president: user._id,
      description,
    });
    console.log(club);
    return res.status(200).json(club);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

// getting all club
const fetchClubs = async (req, res) => {
  try {
    let allClub = await Club.find()
      .populate("latestEvent")
      .populate("events")
      .populate("president", "-password")
      .sort({ updatedAt: -1 });
    console.log("All club ");

    console.log(allClub);
    res.status(200).send(allClub);
  } catch (error) {
    console.log(error);

    res.status(401).send(error.message);
  }
};

// deleting a club
const deleteClub = async (req, res) => {
  try {
    const { clubId } = req.body;

    if (!clubId) {
      console.log("clubId param not sent with request");
      return res.sendStatus(400);
    }

    var isClub = await Club.findByIdAndDelete(clubId);
    console.log(isClub);

    if (!isClub) {
      res.status(400).send("Oops Something went wrong !");
    }
    res.status(200).send(isClub);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// creating a group chat
const createGroupChat = async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all fields" });
    }
    let users = JSON.parse(req.body.users);

    if (users.lenght < 2) {
      return res.status(400).send({
        success: false,
        message: "Atleast 2 users are required for a group chat",
      });
    }
    users.push(req.user);

    const groupChat = await chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      groupAdmin: req.user,
      users: users,
    });
    if (!groupChat) {
      return res
        .status(400)
        .send({ success: false, message: "Oops Something went wrong !" });
    }
    const fullChat = await chat
      .findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    console.log(groupChat);

    return res.status(200).json(fullChat);
  } catch (error) {
    console.log(error);
    return res.status(200).send(error.message);
  }
};

// renaming a group chat
const renameGroupChat = async (req, res) => {
  try {
    const { groupId, chatName } = req.body;

    const groupChat = await chat
      .findByIdAndUpdate(groupId, { chatName }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!groupChat) {
      return res.status(400).send({ success: false, message: "Invalid Group" });
    }

    return res.status(200).json(groupChat);
  } catch (error) {
    console.log(error);
    return res.send(error.message);
  }
};

// add user to a group chat
const addToGroupChat = async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    if (!userId || !groupId) {
      return res.status(400).send("All fields are required !");
    }
    const groupChat = await chat
      .findByIdAndUpdate(groupId, { $push: { users: userId } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!groupChat) {
      return res.status(400).send("Oops something went wrong !");
    }
    return res.json(groupChat);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

// remove user from a group chat
const removeUserFromGroupChat = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    if (!groupId || !userId) {
      return res.status(400).send("All fields are required !");
    }
    // const groupChat = await chat
    //   .findByIdAndUpdate(groupId, { $pull: { users: userId } })
    //   .populate("users", "-password")
    //   .populate("groupAdmin", "-password");
    let groupChat = await chat
      .findByIdAndUpdate(groupId, { $pull: { users: userId } })
      .populate("users", "-password");

    if (!groupChat) {
      return res.status(400).send("Oops something went wrong!");
    }

    // If the removed user is the group admin, update the groupAdmin to the first remaining user
    if (groupChat.groupAdmin._id.toString() === userId.toString()) {
      groupChat.groupAdmin = groupChat.users[0];
    }

    groupChat = await groupChat.populate("groupAdmin", "-password");
    groupChat.save();

    return res.status(200).json(groupChat);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  fetchClubs,
  createClub,
  accessClub,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  removeUserFromGroupChat,
};
