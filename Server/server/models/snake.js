const mongoose = require('mongoose');

const snakeSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required:true
    },
    length: {
      type: Number,
      required: true
    },
    deadly: {
      type: Boolean,
      required: true
    }
  });

const Snake = mongoose.model('Snake', snakeSchema);
module.exports = Snake;
