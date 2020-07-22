var Recette = require('../server/controllers/controllerRecette.js');

module.exports = function(router) {
    router.post('/recipe/create', Recette.createRecette);
    router.get('/recipe/get', Recette.getAllRecettes);
    router.get('/recipe/get/:description', Recette.getRecettesByDescription);
    router.put('/recipe/update/:id', Recette.updateRecette);
    router.delete('/recipe/remove/:id', Recette.removeRecette);
}