var Ingredient = require('../modeleIngredient.js');
exports.createIngredient = function (req, res, next) {
    var ingredient = {
        idIngredient: req.body.idIngredient,
        nomIngredient: req.body.nomIngredient
    };
    Ingredient.create(ingredient, function(err, ingredient) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Ingrédient créé avec succès"
        })
    })
}
exports.getAllIngredients = function(req, res, next) {
    Ingredient.get({}, function(err, ingredient) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            ingredient
        })
    })
}

exports.getIngredientByName = function(req, res, next) {
    Ingredient.get({nomIngredient: req.params.nomIngredient}, function(err, ingredient) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            ingredient
        })
    })
}

exports.updateIngredient = function(req, res, next) {
    var ingredient = {
        idIngredient: req.body.idIngredient,
        nomIngredient: req.body.nomIngredient
    }
    Ingredient.update({_idIngredient: req.params.idIngredient}, ingredient, function(err, ingredient) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Ingrédient modifié avec succès"
        })
    })
}

exports.removeIngredient = function(req, res, next) {
    Ingredient.delete({_idIngredient: req.params.idIngredient}, function(err, ingredient) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Ingrédient supprimé avec succès"
        })
    })
}