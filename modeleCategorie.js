/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let categorieSchema = new Schema({
	idCategorie  : Int16Array,
  nomCategorie : String,
  plats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plat"
    }
  ]
});

// Create a model using schema
let Categorie = mongoose.model("Categories", categorieSchema);

//CRUD du schéma
categorieSchema.statics = {
    create : function(data, cb) {
      var categorie = new this(data);
      categorie.save(cb);
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
module.exports = Categorie;