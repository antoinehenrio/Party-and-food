var Vote = require('../controllers/controllerVote.js');
var authMiddleware = require('../middleware/auth.js');

module.exports = function(router) {
    router.post('/poll/create/:code', authMiddleware.requireJWT, Vote.createVote);
    router.get('/poll/get/:code', authMiddleware.requireJWT, Vote.getSelfVote);
    router.put('/poll/update/:id', authMiddleware.requireJWT, Vote.getVoteBySoiree);
    router.delete('/poll/remove/:id', Vote.removeVote);
}