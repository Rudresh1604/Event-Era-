const { Club } = require("../models/clubModel");
const { Event } = require("../models/EventModel");
const User = require("../models/userModel");

// accesss a event
const accessEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    console.log("Access event called");

    console.log(userId, eventId);

    if (!eventId) {
      console.log("eventId param not sent with request");
      return res.sendStatus(400);
    }

    var isEvent = await Event.findById(eventId)
      .populate({
        path: "organiser",
        populate: { path: "president", select: "-password" },
      })
      .populate({ path: "eventHead", select: "-password" });

    console.log(isEvent);
    if (!isEvent) {
      return res.status(400).send("Oops Something went wrong !");
    }
    const user = await User.findById(userId);
    if (userId == isEvent.organiser._id || user.isMainAdmin) {
      return res.status(200).send(isEvent);
    }
    isEvent.participants = [];
    return res.status(200).send(isEvent);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

// create a Event
const createEvent = async (req, res) => {
  const { name, description, eventHead, organiser, price, date, participants } =
    req.body;
  try {
    console.log(req.body);
    console.log("create event called");

    if (!name || !description || !eventHead || !price) {
      return res.status(400).send("All fields are required !");
    }
    const user = await User.findOne({ name: eventHead });
    if (!user) {
      return res.status(400).send("Please give correct name of event Head");
    }
    const event = await Event.create({
      name,
      organiser,
      price,
      description,
      eventHead: user,
      // participants,
    });
    const club = await Club.findByIdAndUpdate(
      event.organiser._id,
      { $push: { events: event._id } },
      { new: true }
    );

    console.log(club);

    console.log(event);
    return res.status(200).json(event);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

// getting all events
const fetchAllEvents = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { organiser: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const result = await Event.find(keyword);
    res.status(200).send(result);
    // .find({_id:{$ne:req.user._id}})
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// deleting a event
const deleteEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    if (!eventId) {
      console.log("eventId param not sent with request");
      return res.sendStatus(400);
    }

    // user who is attempting to delete the event
    const user = await User.findById(userId);

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    if (!isMainAdmin && user._id != event.eventHead) {
      return res.status(403).send("Access Denied!");
    }

    // Remove the event from the Club's events array and reset latestEvent if needed
    await Club.updateOne(
      { _id: event.organiser, events: eventId }, // Find the club with this event
      {
        $pull: { events: eventId },
        $unset: { latestEvent: "" }, // Reset latestEvent if it matches the deleted event
      },
      {
        arrayFilters: [{ events: { $eq: eventId } }], // Ensure eventId is in the array
      }
    );

    // Delete the event from the Event model
    await Event.findByIdAndDelete(eventId);

    res.status(200).send("Event deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchAllEvents, deleteEvent, createEvent, accessEvent };
