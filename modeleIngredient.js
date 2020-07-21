/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let ingredientSchema = new Schema({
	idIngredient : Int16Array,
	nomIngredient : String
});

// Create a model using schema
let Ingredient = mongoose.model("Ingredients", ingredientSchema);

// make this model available
module.exports = Ingredient;