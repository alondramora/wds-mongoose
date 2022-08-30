const mongoose = require('mongoose')

//importing the model from User.js, we can access this because we used module.exports
const User = require("./User")

mongoose.connect("mongodb://localhost/testdb")

run()
async function run() {
    try {
            // commented code below to follow along with video

        // const user = await User.create({
        //     name: 'Alondra',
        //     age: 26, // if this was an odd number, the validation on uer.js would fail and we would get the specified message
        //     email: 'TEST@test.com',
        //     hobbies: ['Travel, Coding, Hiking'],
        //     address: {
        //         street: 'Main St',
        //         city: 'Portland',
        //     }
        // })
        // console.log(user)

                // commented code above to follow along with video

        ////// Examples of some built in methods to use in Mongoose ////////
        // const user = await User.findById("630d8e7fb93726a9b53052b6") // findById found the user with the specified ID 
        // const user = await User.find({name : "Kyle"}) // find found all of the users with name Kyle
        // const user = await User.findOne({ name: "Kyle"}) // findOne finds the first object with name of Kyle
        // const user = await User.exists({ name: "Kyle"}) // exists returns true or false
        const user = await User.deleteOne({ name: "Kyle"}) // first thing that matches will be deleted, deleteMany will delete everything that matches


        console.log(user)

    } catch (e) {
        console.log(e.message) // will give you a more descriptive error message
    }
}

// When it comes to functions for the User, a lot of the methods skip validation. 

    // Commented out this code because we moved it into the try catch block above
    // const user = await User.create({
    //     name: 'Alondra',
    //     age: 'fffhf',
    //     hobbies: ['Travel, Coding, Hiking'],
    //     address: {
    //         street: 'Main St',
    //         city: 'Portland',
    //     }
    // })
    // console.log(user)

// run()
// async function run() {
//     const user = await User.create({ name: "Kyle", age: 26}) // does the same thing as creating a new user and saving commented code below
//     // user.name = "Sally" // renaming the name key to "Sally", when we console log the name will be Sally
//     // const user = new User({ name: "Kyle", age: 26 })
//     // await user.save()
//     console.log(user)
// }


//instantiating a new user object to create a new user
// name and age are keys
// put them inside of a variable called user
// const user = new User({ name: "Kyle", age: 26 })
// user.save().then(() => console.log("User saved"))