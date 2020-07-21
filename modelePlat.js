/*globals require, module */

const { ObjectID } = require("bson");

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let platSchema = new Schema({
	idPlat : ObjectID,
	nomPlat : String,
	categorie: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categorie"
        }
    ]
});

// Create a model using schema
let Plat = mongoose.model("Plats", platSchema);

//CRUD du schéma
platSchema.statics = {
    create : function(data, cb) {
      var plat = new this(data);
      plat.save(cb);
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
module.exports = Plat;