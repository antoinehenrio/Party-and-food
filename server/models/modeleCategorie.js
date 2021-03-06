/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// create a schema for Dish
let categorieSchema = new Schema({
	idCategorie  : {type: ObjectId, auto: true, required: true, index: true},
  nomCategorie : String,
  photoURL: String,
  plats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plat"
    }
  ]
});

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

// Create a model using schema
let Categorie = mongoose.model("Categories", categorieSchema);

// make this model available
module.exports = Categorie;