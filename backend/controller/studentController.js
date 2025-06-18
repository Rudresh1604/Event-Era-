const sendMail = require("../helper/sendMail");
const { Event } = require("../models/EventModel");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "fill",
      },
    ],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image"), false);
    }
  },
});

// accesss a event
const accessEvent = async (req, res) => {
  try {
    const { eventId } = req.query;
    console.log(req.body);

    console.log("Access event for student called");
    console.log(eventId);

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
    isEvent.participants = [];
    return res.status(200).send(isEvent);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const fetchAllEvents = async (req, res) => {
  try {
    // run a query which populates this
    const { search } = req.query;
    console.log(search);

    let allEvents;
    if (search != "all") {
      allEvents = await Event.find({
        $or: [
          { name: new RegExp(search, "i") },
          { "organiser.clubName": new RegExp(search, "i") },
        ],
      })
        .populate({
          path: "organiser",
          populate: { path: "president", select: "-password" },
        })
        .populate({ path: "eventHead", select: "-password" });
    } else if (search == "all") {
      allEvents = await Event.find()
        .populate({
          path: "organiser",
          populate: { path: "president", select: "-password" },
        })
        .populate({ path: "eventHead", select: "-password" });
    }
    console.log(allEvents);
    if (!allEvents) {
      return res.status(400).send("Error occured fetching all events !");
    }
    return res.status(200).send(allEvents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const registerForEvent = async (req, res) => {
  const { name, email, section, department, mobile, reciept, eventId } =
    req.body;
  console.log(req.body);

  try {
    if (
      !name ||
      !email ||
      !section ||
      !department ||
      !mobile ||
      !reciept ||
      !eventId
    ) {
      return res.status(400).send("All fields are required ! ");
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    let event = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        $push: {
          participants: {
            name,
            email,
            mobile,
            reciept,
            department,
            class: section,
          },
        },
      },
      { new: true }
    );
    const mailOption = {
      from: "rdharkar16@gmail.com",
      to: `${email}`,
      subject: "Your Registration for CSI Event has been successful",
      text: `Dear ${name},
        
  We are pleased to confirm your registration for CSI Event . Thank you for signing up!
  
  Event Details:
  - Event Name: ${event.name}
  - Date: ${event.date}
  - Time: ${event.time} 
  - Venue: DYPIEMR Campus
  
  We look forward to seeing you at the event.
  
  Best regards,
  ${event.organiser.name}
  DYPIEMR
  `,
    };
    const acknowledgeEmail = await sendMail(mailOption);
    // console.log(acknowledgeEmail);

    res.status(200).send("Thank You ! Registered Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

module.exports = { registerForEvent, accessEvent, fetchAllEvents };
