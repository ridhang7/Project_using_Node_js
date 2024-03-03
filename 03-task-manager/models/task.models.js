const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a mandatory"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  TaskStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
