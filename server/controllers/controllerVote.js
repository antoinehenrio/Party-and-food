
var Vote = require('../models/modeleVote.js');

exports.createVote = function (req, res, next) {
    req.body.votant = req.user._id
    Vote.create(req.body, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Vote créé avec succès"
        })
    })
}

exports.getVoteBySoiree = function(req, res, next) {
    User.get({soiree: req.params.idSoiree}, function(err, user) {
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

exports.updateVote = function(req, res, next) {
    Vote.update({_id: req.vote._id}, { $set: req.body }, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Vote modifié avec succès"
        })
    })
}

exports.removeVote = function(req, res, next) {
    Vote.delete({_id: req.params.id}, function(err, vote) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Utilisateur supprimé avec succès"
        })
    })
}