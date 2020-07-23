var Preference = require('../controllers/controllerPreference.js');
var authMiddleware = require('../middleware/auth.js');

module.exports = function(router) {
    router.post('/preference/create', authMiddleware.requireJWT, Preference.createPreference);
    router.get('/preference/get/:id', authMiddleware.requireJWT, Preference.updatePreference);
    //router.put('/preference/update/:id', authMiddleware.requireJWT, Preference.getPreferenceBySoiree);
    router.delete('/preference/remove/:id', Preference.removePreference);
}