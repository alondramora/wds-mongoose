const mongoose = require('mongoose')

//importing the model from User.js, we can access this because we used module.exports
const User = require("./User")

mongoose.connect("mongodb://localhost/testdb")

run()
async function run() {
    const user = await User.create({ name: "Kyle", age: 26}) // does the same thing as creating a new user and saving commented code below
    user.name = "Sally" // renaming the name key to "Sally", when we console log the name will be Sally
    // const user = new User({ name: "Kyle", age: 26 })
    // await user.save()
    console.log(user)
}


//instantiating a new user object to create a new user
// name and age are keys
// put them inside of a variable called user
// const user = new User({ name: "Kyle", age: 26 })
// user.save().then(() => console.log("User saved"))