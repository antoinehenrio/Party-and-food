/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let recetteSchema = new Schema({
    quantite : Int16Array,
	description  : String,
    ingredients: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient"
        }
      ],
    plats: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plat"
        }
    ]
});

// Create a model using schema
let Recette = mongoose.model("Recettes", userSchema);

// make this model available
module.exports = Recette;