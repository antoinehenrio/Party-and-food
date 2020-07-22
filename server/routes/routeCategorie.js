var Cateogrie = require('../controllers/controllerCategorie.js');

module.exports = function(router) {
    router.post('/category/create', Cateogrie.createCategorie);
    router.get('/category/get', Cateogrie.getAllCategories);
    router.get('/category/get/:nomCategorie', Cateogrie.getCategorieByName);
    router.put('/category/update/:id', Cateogrie.updateCategorie);
    router.delete('/category/remove/:id', Cateogrie.removeCategorie);
}