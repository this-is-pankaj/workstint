'use strict';

const mongoose = require('mongoose');
const	Schema = mongoose.Schema;

let SessionSchema = new Schema({
  "userId": {
    type: String,
    unique: true,
  },
	"sessions": [
    {
      "id": {
        type: String,
        required: true,
      },
      "expiry": {
        type: Number,
        required: true,
      },
      "createdOn": {
        type: Date,
        default: Date.now,
      },
    }
  ],
});

module.exports = mongoose.model('sessions', SessionSchema);