const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    //title:  String, // String is shorthand for {type: String}
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },

  });
const User = mongoose.model('user', UserSchema);
module.exports = User;