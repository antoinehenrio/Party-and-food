/*globals require, module */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const passportLocalMongoose = require('passport-local-mongoose');

// create a schema for Dish
let userSchema = new Schema({
    id : {type: ObjectId, auto: true, required: true, index: true},
	  name  : String,
	  firstname   : String,
  	email : {
      type: String,
      validate: {
        validator: (v) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
        },
        message: "Ce n'est pas une bonne adresse e-mail !"
      }
    },
    telephone : {
      type: String,
      validate: {
        validator: (v) => {
          return /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/.test(v)
        },
        message: "Ce n'est pas un bon numéro de téléphone !"
      }
    },
    photo: { data: Buffer },
    ingredients: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredients"
        }
    ],
    soirees: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Soirees"
        }
      ]
});

userSchema.plugin(passportLocalMongoose, {
  session: false
})

// Create a model using schema
let User = mongoose.model("Users", userSchema);

// make this model available
module.exports = User;