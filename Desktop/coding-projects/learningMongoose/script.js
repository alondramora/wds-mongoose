const mongoose = require('mongoose')

//importing the model from User.js
const User = require("./User")

mongoose.connect("mongodb://localhost/testdb")