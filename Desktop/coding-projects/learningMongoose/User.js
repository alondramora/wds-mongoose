const mongoose = require("mongoose")


// Second way to do a nested object, needs to be initialized BEFORE we can access it in the schema. This can be a better route if the object is more complex.
const addressSchema = new mongoose.Schema({
        street: String,
        city: String,
})

//Creating a new Schema named userSchema
// Keys will be the same name of the keys in your Mongodb database
const userSchema = new mongoose.Schema({
    name: String,
    // age: Number,
    age: {
        type: Number,
        min: 1,          // setting a minimum number for age
        max: 100,        // setting a max number for age
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minLength: 10, // sets min length # to 10 characters
        required: true, // sets the email key to be required, if the email is not included then you will receive an error
        lowercase: true, // will turn all of the letters to all lowercase. You can also do the same with uppercase.
    },
    createdAt: {
        type: Date,
        // default: new Date(), // if you did it this way, its like the same thing as hard coding a date. It's a static value. 
        default: () => Date.now(), // will automatically run the function that gets the current date so that it is dynamic
        immutable: true, // this will NEVER let us change createdAt
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    // bestFriend: mongoose.SchemaTypes.ObjectId,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User" // reference the User model, what model does this id look at?
    },
    hobbies: [String], // this type is an array of strings
    // address: {             // we can nest objects as well, you can do it this way OR you can do it in a seperate Schema
    //     street: String,
    //     city: String
    // }
    address: addressSchema,
})

// All validation custom or built in only runs with the create or save method. Other built in methods dont go through validation because they go directly thought the MongoDB database. Some of those include find, count, findbyID, AndUpdate, AndReplace, etc. 


//////Adding METHODS on to our user schema instances/////////
// Create a method called sayHi, we cannot use arrow functions bc we have to use "this" to refernce the specific instance we are working with
userSchema.methods.sayHi = function () {
    console.log(`Hi, my name is ${this.name}`) // will console log the instance User name, we can call this sayHi function in the script.js file
}


///// Static methods //////
userSchema.statics.findByName = function (name) { // we can call this function in the user.js file under the user
    return this.find({ name: new RegExp(name, "i")})
}


////// Adding something only to a query ////////
userSchema.query.byName = function (name) {
    return this.find({ name: new RegExp(name, "i")}) // chainable with a query

}


////// Virtual ///////

// namedEmail is the name we are giving this virutal. A virtual is a property that is not on the actual schema but its a virtual property based on other properties on there. Does not get saved in our database only avail inside of our code.

userSchema.virtual('namedEmail').get(function () {
    return `${this.name} <${this.email}>` // I think this is the reason my code is returning null, will pick back up on this tomorrow
})


////// Middleware for save, validate, and remove ///////

//module.exports will allow us to use the model in script.js
// Model name will be the first param and name of a collection in MongoDB
module.exports = mongoose.model("User", userSchema) // Schema name is passed in