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

//CRUD du schéma
soireeSchema.statics = {
    create : function(data, cb) {
      var soiree = new this(data);
      soiree.save(cb);
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
module.exports = Soiree;