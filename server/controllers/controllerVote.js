
var Vote = require('../models/modeleVote.js');
var Soiree = require('../models/modeleSoiree.js');

exports.createVote = function (req, res, next) {
    req.body.votant = req.user._id
    Soiree.findOne({code: req.params.soiree}, (err, soiree) => {
        req.body.soiree = soiree._id
        Vote.create(req.body, function(err, vote) {
            if(err) {
                console.log(err)
                res.json({
                    error : err
                })
            } else {
                res.json({
                    message : "Vote créé avec succès"
                })
            }
        })
    })
}

exports.getSelfVote = function(req, res, next) {
    req.body.votant = req.user._id
    Soiree.findOne({code: req.params.soiree}, (err, soiree) => {
        req.body.soiree = soiree._id
        Vote.findOne({votant : req.user._id, soiree : soiree._id}, function(err, vote) {
            if(err) {
                console.log(err)
                res.json({
                    error : err
                })
            } else {
                res.json({
                    vote
                })
            }
        })
    })
}

exports.getVoteBySoiree = function(req, res, next) {
    Vote.get({soiree: req.params.idSoiree}, function(err, user) {
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
            message : "Vote supprimé avec succès"
        })
    })
}