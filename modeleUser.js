/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let userSchema = new Schema({
	name  : String,
	firstname   : String,
	email : String,
    telephone : String,
    password : String
});

// Create a model using schema
let User = mongoose.model("Users", userSchema);

// make this model available
module.exports = User;