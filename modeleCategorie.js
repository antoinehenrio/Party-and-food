/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let categorieSchema = new Schema({
	idCategorie  : Int16Array,
	nomCategorie : String
});

// Create a model using schema
let Categorie = mongoose.model("Categories", categorieSchema);

// make this model available
module.exports = Categorie;