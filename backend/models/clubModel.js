const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    clubName: { type: String, trim: true },
    description: { type: String },
    secretKey: { type: String, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    latestEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);

module.exports = { Club };
