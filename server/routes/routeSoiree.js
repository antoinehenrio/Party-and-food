var Soiree = require('../controllers/controllerSoiree.js');
var authMiddleware = require('../middleware/auth.js');

module.exports = function(router) {
    router.post('/party/create', authMiddleware.requireJWT, Soiree.createSoiree);
    router.get('/party/get', authMiddleware.requireJWT, Soiree.getAllSoirees);
    router.get('/party/get/:nomSoiree', Soiree.getSoireeByDescription);
    router.get('/party/get/date/:dateSoiree', Soiree.getSoireesByDate);
    router.put('/party/update/:id', authMiddleware.requireJWT, Soiree.updateSoiree);
    router.delete('/party/remove/:id', Soiree.removeSoiree);
}