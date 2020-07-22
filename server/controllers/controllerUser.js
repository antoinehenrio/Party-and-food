var User = require('./modeleUsers.js.js');
exports.createUser = function (req, res, next) {
    var user = {
        id: req.body.name,
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        groupes: req.body.groupes
    };
    User.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Utilisateur créé avec succès"
        })
    })
}
exports.getAllUsers = function(req, res, next) {
    User.get({}, function(err, categorie) {
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
    User.get({name: req.params.name}, function(err, user) {
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
    User.get({firstname: req.params.firstname}, function(err, user) {
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
    User.get({email: req.params.email}, function(err, user) {
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
    User.get({telephone: req.params.telephone}, function(err, user) {
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
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        groupes: req.body.groupes
    }
    User.update({_id: req.params.id}, user, function(err, user) {
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
    User.delete({_id: req.params.id}, function(err, user) {
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