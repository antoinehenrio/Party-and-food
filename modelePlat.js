/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let platSchema = new Schema({
	idPlat : Int16Array,
	nomPlat : String,
	categorie: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categorie"
        }
    ]
});

// Create a model using schema
let Plat = mongoose.model("Plats", platSchema);

// make this model available
module.exports = Plat;