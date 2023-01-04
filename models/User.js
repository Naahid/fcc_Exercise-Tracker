const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;