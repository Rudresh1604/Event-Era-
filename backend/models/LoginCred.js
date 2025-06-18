const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const csiAdmin = mongoose.model("csiAdmin", clubSchema);
const codersAdmin = mongoose.model("codersAdmin", clubSchema);
const mainAdmin = mongoose.model("mainAdmin", adminSchema);

module.exports = { csiAdmin, codersAdmin, mainAdmin };
