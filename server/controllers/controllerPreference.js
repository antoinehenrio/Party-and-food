var Preference = require('../models/modelePreference.js');
var Soiree = require('../models/modeleSoiree.js');

exports.createPreference = function (req, res, next) {
    req.body.votant = req.user._id
    Preference.create(req.body, function(err, preference) {
        if(err) {
            console.log(err)
            res.json({
                error : err
            })
        } else {
            Soiree.findOne({_id: req.body.soiree}, function(err, soiree) {
                soiree.preferences.push(preference._id)
                soiree.save()
                res.json({
                    message : "Preference créée avec succès"
                })
            })
        }
    })   
}

exports.updatePreference = function(req, res, next) {
    Preference.update({_id: req.vote._id}, { $set: req.body }, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Preference modifiée avec succès"
        })
    })
}

exports.removePreference = function(req, res, next) {
    Preference.delete({_id: req.params.id}, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Préférence supprimée avec succès"
        })
    })
}