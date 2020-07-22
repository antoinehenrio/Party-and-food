var Soiree = require('../models/modeleSoiree.js');
const { equal } = require('assert');


let makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
 }

exports.createSoiree = function (req, res, next) {
    //l'organisateur est le créateur de la soirée et participe à la soirée
    req.body.organisateur = req.user._id
    req.body.utilisateurs = [req.user._id]
    req.body.code = makeid(9)
    Soiree.create(req.body, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée créée avec succès"
        })
    })
}

exports.getAllSoirees = function(req, res, next) {
    Soiree.get({utilisateurs: req.user._id}, function(err, soiree) {
        console.log(err)
        /*if(err) {
            res.json({
                error: err
            })
        }*/
        res.json({
            soiree
        })
    })
}

exports.getSoireeByDescription = function(req, res, next) {
    Soiree.get({descriptionSoiree: req.params.descriptionSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.getSoireesByDate = function(req, res, next) {
    Soiree.get({dateSoiree: req.params.dateSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.getSoireeByGroupe = function(req, res, next) {
    Soiree.get({groupe: req.params.groupe}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.updateSoiree = function(req, res, next) {
    Soiree.update({_id: req.params.id}, {$set: req.body}, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée modifiée avec succès"
        })
    })
}

exports.removeSoiree = function(req, res, next) {
    Soiree.delete({_id: req.params.idSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée supprimée avec succès"
        })
    })
}