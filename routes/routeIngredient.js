var Ingredient = require('./controllers/controllerIngredient.js');

module.exports = function(router) {
    router.post('/category/create', Ingredient.createIngredient);
    router.get('/category/get', Ingredient.getAllIngredients);
    router.get('/category/get/:nomIngredient', Ingredient.getIngredientByName);
    router.put('/category/update/:id', Ingredient.updateIngredient);
    router.delete('/category/remove/:id', Ingredient.removeIngredient);
}