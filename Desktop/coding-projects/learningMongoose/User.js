const mongoose = require("mongoose")

//Creating a new Schema named userSchema
// Keys will be the same name of the keys in your Mongodb database
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

// Model name will be the name of a collection in MongoDB
module.exports = mongoose.model("User", userSchema) // Schema name is passed in