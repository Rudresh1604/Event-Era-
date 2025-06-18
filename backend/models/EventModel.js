const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  organiser: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
  price: { type: String, required: true },
  eventHead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      class: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      reciept: {
        type: String,
        required: true,
      },
    },
  ],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
  Event,
};
