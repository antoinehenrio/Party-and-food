var Preference = require('../models/modelePreference.js');

exports.createPreference = function (req, res, next) {
    req.body.votant = req.user._id
    Preference.create(req.body, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Preference créée avec succès"
        })
    })
}

exports.getPreferenceBySoiree = function(req, res, next) {
    Preference.get({soiree: req.params.idSoiree}, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            user
        })
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