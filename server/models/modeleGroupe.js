/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// create a schema for Dish
let groupeSchema = new Schema({
	idGroupe : ObjectId,
  nomGroupe : String,
  utilisateurs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

// Create a model using schema
let Groupe = mongoose.model("Groupes", groupeSchema);

//CRUD du schéma
groupeSchema.statics = {
    create : function(data, cb) {
      var groupe = new this(data);
      groupe.save(cb);
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
module.exports = Groupe;