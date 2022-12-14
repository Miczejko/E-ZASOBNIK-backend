const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    name: String,
    profPic: String,
    rank: String
})

module.exports = mongoose.model("user", UserSchema);