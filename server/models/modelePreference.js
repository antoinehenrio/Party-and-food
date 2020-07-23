/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


// create a schema for Dish
let preferenceSchema = new Schema({
    souhaits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }],
    rejets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    }],
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    },
    soiree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
        required: true
    }
});

//CRUD du schéma
preferenceSchema.statics = {
    create : function(data, cb) {
      var preference = new this(data);
      preference.save(cb);
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
let Preference = mongoose.model("Preferences", preferenceSchema);

// make this model available
module.exports = Preference;