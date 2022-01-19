const { Schema, model } = require("mongoose");

const LogSchema = Schema({
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true
  },
  log: {
    type: Array,
    required: true
  }
});

module.exports = model("Log", LogSchema);