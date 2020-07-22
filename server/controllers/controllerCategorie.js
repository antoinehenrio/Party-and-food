var Categorie = require('../models/modeleCategorie.js');

exports.createCategorie = function (req, res, next) {
    var categorie = {
        idCategorie: req.body.idCategorie,
        nomCategorie: req.body.nomCategorie,
        plats: req.body.plats
    };
    Categorie.create(categorie, function(err, categorie) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Catégorie créée avec succès"
        })
    })
}
exports.getAllCategories = function(req, res, next) {
    Categorie.get({}, function(err, categorie) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            categorie
        })
    })
}

exports.getCategorieByName = function(req, res, next) {
    Categorie.get({nomCategorie: req.params.nomCategorie}, function(err, categorie) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            categorie
        })
    })
}

exports.updateCategorie = function(req, res, next) {
    var categorie = {
        idCategorie: req.body.idCategorie,
        nomCategorie: req.body.nomCategorie,
        plats: req.body.plats
    }
    Categorie.update({_idCategorie: req.params.idCategorie}, categorie, function(err, categorie) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Catégorie modifiée avec succès"
        })
    })
}

exports.removeCategorie = function(req, res, next) {
    Categorie.delete({_idCategorie: req.params.idCategorie}, function(err, categorie) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Catégorie supprimée avec succès"
        })
    })
}