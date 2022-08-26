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
        validator: v => v % 2 === 0,
        message: props => `${props.value} is not an even number`,
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
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String], // this is an array of strings
    // address: {             // we can nest objects as well, you can do it this way OR you can do it in a seperate Schema
    //     street: String,
    //     city: String
    // }
    address: addressSchema,
})


//module.exports will allow us to use the model in script.js
// Model name will be the first param and name of a collection in MongoDB
module.exports = mongoose.model("User", userSchema) // Schema name is passed in