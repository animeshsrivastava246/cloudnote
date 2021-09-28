const mongoose = require('mongoose');

const NotesSchema = new Schema({
    //title:  String, // String is shorthand for {type: String}
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },

  });

  module.exports = mongoose.model('notes', NotesSchema)