/*globals require, module */


const { ObjectID } = require("bson");

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let ingredientSchema = new Schema({
	idIngredient : ObjectID,
	nomIngredient : String
});

// Create a model using schema
let Ingredient = mongoose.model("Ingredients", ingredientSchema);

//CRUD du schéma
ingredientSchema.statics = {
    create : function(data, cb) {
      var ingredient = new this(data);
      ingredient.save(cb);
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
module.exports = Ingredient;