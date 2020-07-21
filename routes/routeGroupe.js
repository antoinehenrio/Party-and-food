var Groupe = require('./controllers/controllerGroupe.js');

module.exports = function(router) {
    router.post('/group/create', Groupe.createGroupe);
    router.get('/group/get', Groupe.getAllGroupes);
    router.get('/group/get/:nomGroupe', Groupe.getGroupeByName);
    router.put('/group/update/:id', Groupe.updateGroupe);
    router.delete('/group/remove/:id', Groupe.removeGroupe);
}