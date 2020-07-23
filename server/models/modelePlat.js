/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// create a schema for Dish
let platSchema = new Schema({
	idPlat : {type: ObjectId, auto: true, required: true, index: true},
	nomPlat : String,
	categorie: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categorie"
        }
    ]
});

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

// Create a model using schema
let Plat = mongoose.model("Plats", platSchema);

// make this model available
module.exports = Plat;