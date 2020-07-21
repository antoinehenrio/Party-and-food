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
    plats: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plat"
        }
});

// Create a model using schema
let Recette = mongoose.model("Recettes", userSchema);

//CRUD du schéma
recetteSchema.statics = {
    create : function(data, cb) {
      var recette = new this(data);
      recette.save(cb);
    },     
    get: function(query, cb) {
      this.find(query, cb);
    },
    getByName: function(query, cb) {
      this.find(query, cb);
    },
    update: function(query, updateData, cb) { 
      this.findOneAndUpdate(query, 
           {$set: updateData},{new: true}, cb);
    },
    delete: function(query, cb) {    
      this.findOneAndDelete(query,cb);
    }
}

// make this model available
module.exports = Recette;