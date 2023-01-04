const mongoose = require("mongoose");

// Create Schema
const ExerciseSchema = new mongoose.Schema({
    username: {
        type: String
    },
    description:{
        type: String
    },
    duration: {
        type:Number
    },
    date:{
        type: Date,
    },
    id:{
        type: String
    }
});

const Exercise = mongoose.model('exercise', ExerciseSchema);
module.exports = Exercise;