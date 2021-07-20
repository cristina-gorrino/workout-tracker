const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema ({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
    },
    weight: {
        type: Decimal,
    },
    sets: {
        type: Integer,
    },
    reps: {
        type: Integer,
    },
    duration: {
        type: Integer,
    },
    distance: {
        type: Integer,
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;