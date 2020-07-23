var Plat = require('../controllers/controllerPlat.js');
const { route } = require('../server.js');

module.exports = function(router) {
    router.post('/dish/create', Plat.createPlat);
    router.get('/dish/poll/:code', Plat.getPlatsForPoll);
    router.get('/dish/get', Plat.getAllPlats);
    router.get('/dish/get/:nomPlat', Plat.getPlatByName);
    router.put('/dish/update/:id', Plat.updatePlat);
    router.delete('/dish/remove/:id', Plat.removePlat);
}