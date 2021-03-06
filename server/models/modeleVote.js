/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


// create a schema for Dish
let voteSchema = new Schema({
    votant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    soiree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Soiree",
      required: true
    },
    plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plat",
        required: true
    }
});

//CRUD du schéma
voteSchema.statics = {
    create : function(data, cb) {
      var vote = new this(data);
      vote.save(cb);
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
let Vote = mongoose.model("Votes", voteSchema);

// make this model available
module.exports = Vote;