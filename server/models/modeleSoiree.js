/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


// create a schema for Dish
let soireeSchema = new Schema({
    descriptionSoiree : String,
    dateSoiree : Date,
    heure : Date,
    adresse : String,
    deadLinePref : Date,
    deadLineVote : Date,
    code : String,
    organisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    utilisateurs: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    } ],
    plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat"
    }
    
});

//CRUD du schéma
soireeSchema.statics = {
    create : function(data, cb) {
      var soiree = new this(data);
      soiree.save(cb);
    },     
    get: function(query, cb) {
      this.find(query).populate("utilisateurs").populate("organisateur").exec(cb);
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
let Soiree = mongoose.model("Soirees", soireeSchema);

// make this model available
module.exports = Soiree;