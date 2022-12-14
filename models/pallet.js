const mongoose = require("mongoose");
const PalletSchema = new mongoose.Schema({
    subject: String,
    status: String,
    buy_date: String,
    sold_date: String,
    value: Number,
    userId: String
})

module.exports = mongoose.model("pallet", PalletSchema);