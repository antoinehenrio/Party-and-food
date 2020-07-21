var User = require('./modeleIngredient.js');
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
exports.getAllUsers = function(req, res, next) {
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

exports.getUserByName = function(req, res, next) {
    Categorie.get({name: req.params.name}, function(err, user) {
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

exports.getUserByFirstName = function(req, res, next) {
    Categorie.get({firstname: req.params.firstname}, function(err, user) {
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

exports.getUserByEmail = function(req, res, next) {
    Categorie.get({email: req.params.email}, function(err, user) {
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

exports.getUserByPhone = function(req, res, next) {
    Categorie.get({telephone: req.params.telephone}, function(err, user) {
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

exports.updateUser = function(req, res, next) {
    var user = {
        id: req.body.name,
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        ingredients: req.body.ingredients,
        groupes: req.body.groupes
    }
    Categorie.update({_id: req.params.id}, categorie, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Utilisateur modifié avec succès"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Categorie.delete({_id: req.params.id}, function(err, user) {
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