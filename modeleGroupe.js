/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let groupeSchema = new Schema({
	idGroupe : Int16Array,
	participantsGroupe : String
});

// Create a model using schema
let Groupe = mongoose.model("Groupes", groupeSchema);

// make this model available
module.exports = Groupe;