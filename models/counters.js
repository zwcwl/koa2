const mongoose = require("mongoose")

const counterSchema = mongoose.Schema({
	sequence_value: Number
})

module.exports = mongoose.model("counters", counterSchema)