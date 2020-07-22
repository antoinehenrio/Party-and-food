var Soiree = require('../controllers/controllerSoiree.js');

module.exports = function(router) {
    router.post('/recipe/create', Soiree.createSoiree);
    router.get('/recipe/get', Soiree.getAllSoirees);
    router.get('/recipe/get/:nomSoiree', Soiree.getSoireeByDescription);
    router.get('/recipe/get/date/:dateSoiree', Soiree.getSoireesByDate);
    router.put('/recipe/update/:id', Soiree.updateSoiree);
    router.delete('/recipe/remove/:id', Soiree.removeSoiree);
}