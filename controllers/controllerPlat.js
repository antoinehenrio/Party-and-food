var User = require('./modelePlat.js');
exports.createPlat = function (req, res, next) {
    var plat = {
        idPlat: req.body.name,
        nomPlat: req.body.name
    };
    Plat.create(user, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat créé avec succès"
        })
    })
}

exports.getAllPlats = function(req, res, next) {
    Plat.get({}, function(err, plat) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            plat
        })
    })
}

exports.getPlatByName = function(req, res, next) {
    Plat.get({nomPlat: req.params.nomPlat}, function(err, plat) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            plat
        })
    })
}

exports.updatePlat = function(req, res, next) {
    var plat = {
        idPlat: req.body.name,
        nomPlat: req.body.name
    }
    Plat.update({_idPlat: req.params.idPlat}, categorie, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat modifié avec succès"
        })
    })
}

exports.removePlat = function(req, res, next) {
    Plat.delete({_idPlat: req.params.idPlat}, function(err, plat) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Plat supprimé avec succès"
        })
    })
}