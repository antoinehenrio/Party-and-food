
var Plat = require('../models/modelePlat.js');
var Soiree = require('../models/modeleSoiree.js');
var Preference = require('../models/modelePreference');
var Ingredient = require('../models/modeleIngredient');
var Soiree = require('../models/modeleSoiree');
var Vote = require('../models/modeleVote');
const { forestgreen } = require('color-name');

exports.createPlat = function (req, res, next) {
    var plat = {
        idPlat: req.body.name,
        nomPlat: req.body.name
    };
    Plat.create(plat, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat créé avec succès"
        })
    })
}

exports.getPlatChoisi = function(req, res, next) {
    Soiree.findOne({code: req.params.code}, (err, soiree) => {
        console.log("soiree " + soiree)
        Vote.find({soiree: soiree._id}, (err, votes) => {
            let score = {}
            for(let vote of votes){
                if(score[vote.plat])
                    score[vote.plat]++
                else
                    score[vote.plat] = 1
            }

            let selected, max = 0;

            for(let [k, v] of Object.entries(score)){
                
                if(v > max) {
                    max = v
                    selected = k
                }
            }

            console.log("selected " + JSON.stringify(score))

            Plat.findOne({_id: selected}).populate("Categorie").exec((err, plat) => {
                if(err) {
                    res.json({
                        error: err
                    })
                } else {
                    res.json({
                        plat
                    })
                }
            })
        })
    })
}

exports.getPlatsForPoll = function(req, res, next) {
    Soiree.findOne({code: req.params.code}, (err, soiree) => {
        Preference.find({soiree: soiree._id}, (err, preferences) => {

            let souhaits = []

            for(let preference of preferences)
                for(let souhait of preference.souhaits)
                    souhaits.push(souhait)

            Ingredient.find({_id: souhaits}, (err, ingredients) => {

                let ingres = []

                for(let ingredient of ingredients)
                    ingres.push(ingredient._id)
                
                let search = (ingres.length <= 0) ? {} : {ingredients: ingres}

                Plat.find(search).populate("Categorie").exec((err, plats) => {
                    if(err) {
                        res.json({
                            error: err
                        })
                    } else {
                        res.json({
                            plats
                        })
                    }
                })
            })
        })
    })
}

exports.getAllPlats = function(req, res, next) {
    Plat.get({}, function(err, plat) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            plat
        })
    })
}

exports.getPlatByName = function(req, res, next) {
    Plat.get({nomPlat: req.params.nomPlat}, function(err, plat) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            plat
        })
    })
}

exports.updatePlat = function(req, res, next) {
    var plat = {
        idPlat: req.body.idPlat,
        nomPlat: req.body.nomPlat
    }
    Plat.update({_idPlat: req.params.idPlat}, plat, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat modifié avec succès"
        })
    })
}

exports.removePlat = function(req, res, next) {
    Plat.delete({_idPlat: req.params.idPlat}, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat supprimé avec succès"
        })
    })
}