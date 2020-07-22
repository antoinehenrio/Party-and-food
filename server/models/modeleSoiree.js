/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
 }

// create a schema for Dish
let soireeSchema = new Schema({
    descriptionSoiree : String,
    dateSoiree : Date,
    adresse : String,
    deadLinePref : Date,
    deadLineVote : Date,
    code : {
      type: String,
      default: makeid(9)
    },
    organisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    utilisateurs: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groupe"
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
let Soiree = mongoose.model("Soirees", soireeSchema);

// make this model available
module.exports = Soiree;