/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let userSchema = new Schema({
    id : Number,
	  name  : String,
	  firstname   : String,
  	email : String,
    telephone : String,
    password : String,
    photo : String,
    ingredients: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredients"
        }
    ],
    groupes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Groupe"
        }
      ]
});

// Create a model using schema
let User = mongoose.model("Users", userSchema);

//CRUD du schéma
userSchema.statics = {
    create : function(data, cb) {
      var user = new this(data);
      user.save(cb);
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
module.exports = User;