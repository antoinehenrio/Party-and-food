/*globals require, module */

const { stringify } = require("querystring");

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let soireeSchema = new Schema({
	idSoiree : Int16Array,
    descriptionSoiree : String,
    dateSoiree : Date,
    adresseSoiree1 : String,
    adresseSoiree2 : String,
    codePostalSoiree : String,
    villeSoiree : String,
    categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categorie"
        }
    ],
    groupe: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Groupe"
        },
    plat:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat"
    }
    
});

// Create a model using schema
let Soiree = mongoose.model("Soirees", soireeSchema);

// make this model available
module.exports = Soiree;