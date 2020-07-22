var User = require('../models/modeleGroupe.js');

exports.createGroupe = function (req, res, next) {
    var groupe = {
        idGroupe: req.body.idGroupe,
        nomGroupe: req.body.nomGroupe,
        utilisateurs: req.body.utilisateurs
    };
    Groupe.create(groupe, function(err, groupe) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Groupe créé avec succès"
        })
    })
}
exports.getAllGroupes = function(req, res, next) {
    Groupe.get({}, function(err, groupe) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            groupe
        })
    })
}

exports.getGroupeByName = function(req, res, next) {
    Groupe.get({nomGroupe: req.params.nomGroupe}, function(err, groupe) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            groupe
        })
    })
}

exports.getGroupeByUtilisateurs = function(req, res, next) {
    Groupe.get({utilisateurs: req.params.utilisateurs}, function(err, groupe) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            groupe
        })
    })
}

exports.updateGroupe = function(req, res, next) {
    var groupe = {
        idGroupe: req.body.idGroupe,
        nomGroupe: req.body.nomGroupe,
        utilisateurs: req.body.utilisateurs
    }
    Groupe.update({_idGroupe: req.params.idGroupe}, groupe, function(err, groupe) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Groupe modifié avec succès"
        })
    })
}

exports.removeGroupe = function(req, res, next) {
    Groupe.delete({_idGroupe: req.params.idGroupe}, function(err, groupe) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Groupe supprimé avec succès"
        })
    })
}