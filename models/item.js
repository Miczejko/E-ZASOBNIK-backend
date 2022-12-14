const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
    name: String,
    color: String,
    price: Number,
    material: String,
    state: String,
    palletId: String
})

module.exports = mongoose.model("item", ItemSchema);