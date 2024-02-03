import mongoose from "mongoose";

const User = mongoose.model('User');

module.exports = () => {
    return new User({}).save();
}
