var authMiddleware = require('../middleware/auth.js');
var User = require('../controllers/controllerUser');

module.exports = function(router) {
    router.post('/user/register', authMiddleware.register, authMiddleware.signJWTForUser);
    router.post('/user/login', authMiddleware.signIn, authMiddleware.signJWTForUser);
    router.put('/user/update', authMiddleware.requireJWT, User.updateUser);
    router.get('/user/get', authMiddleware.requireJWT, User.getSelf);
}