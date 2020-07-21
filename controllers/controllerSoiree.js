var User = require('./modeleSoiree.js');
exports.createSoiree = function (req, res, next) {
    var soiree = {
        idSoiree: req.body.idSoiree,
        descriptionSoiree: req.body.descriptionSoiree,
        dateSoiree: req.body.dateSoiree,
        adresseSoiree1: req.body.adresseSoiree1,
        adresseSoiree2: req.body.adresseSoiree2,
        codePostalSoiree: req.body.codePostalSoiree,
        villeSoiree: req.body.villeSoiree,
        categories: req.body.categories,
        groupe: req.body.groupe,
        plat: req.body.plat
    };
    Soiree.create(soiree, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée créée avec succès"
        })
    })
}

exports.getAllSoirees = function(req, res, next) {
    Soiree.get({}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.getSoireeByDescription = function(req, res, next) {
    Soiree.get({descriptionSoiree: req.params.descriptionSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.getSoireesByDate = function(req, res, next) {
    Soiree.get({dateSoiree: req.params.dateSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.getSoireeByGroupe = function(req, res, next) {
    Soiree.get({groupe: req.params.groupe}, function(err, soiree) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            soiree
        })
    })
}

exports.updateSoiree = function(req, res, next) {
    var soiree = {
        idSoiree: req.body.idSoiree,
        descriptionSoiree: req.body.descriptionSoiree,
        dateSoiree: req.body.dateSoiree,
        adresseSoiree1: req.body.adresseSoiree1,
        adresseSoiree2: req.body.adresseSoiree2,
        codePostalSoiree: req.body.codePostalSoiree,
        villeSoiree: req.body.villeSoiree,
        categories: req.body.categories,
        groupe: req.body.groupe,
        plat: req.body.plat
    }
    Soiree.update({_idSoiree: req.params.idSoiree}, categorie, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée modifiée avec succès"
        })
    })
}

exports.removeSoiree = function(req, res, next) {
    Soiree.delete({_idSoiree: req.params.idSoiree}, function(err, soiree) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Soirée supprimée avec succès"
        })
    })
}