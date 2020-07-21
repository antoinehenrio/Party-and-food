var User = require('./modeleRecette.js');
exports.createRecette = function (req, res, next) {
    var recette = {
        idRecette: req.body.idRecette,
        quantite: req.body.quantite,
        description: req.body.description,
        ingredients: req.body.ingredientsRecette,
        plats: req.body.plats
    };
    Recette.create(recette, function(err, recette) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Recette créée avec succès"
        })
    })
}

exports.getAllRecettes = function(req, res, next) {
    Recette.get({}, function(err, recette) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            recette
        })
    })
}

exports.getRecettesByIngredients = function(req, res, next) {
    Recette.get({ingredients: req.params.ingredients}, function(err, recette) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            recette
        })
    })
}

exports.getRecettesByPlats = function(req, res, next) {
    Recette.get({plats: req.params.plats}, function(err, recette) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            recette
        })
    })
}

exports.getRecettesByDescription = function(req, res, next) {
    Recette.get({description: req.params.description}, function(err, recette) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            recette
        })
    })
}

exports.updateRecette = function(req, res, next) {
    var recette = {
        idRecette: req.body.idRecette,
        quantite: req.body.quantite,
        description: req.body.description,
        ingredients: req.body.ingredientsRecette,
        plats: req.body.plats
    }
    Recette.update({_idRecette: req.params.idRecette}, recette, function(err, recette) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Recette modifiée avec succès"
        })
    })
}

exports.removeRecette = function(req, res, next) {
    Recette.delete({_idRecette: req.params.idRecette}, function(err, recette) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Recette supprimée avec succès"
        })
    })
}