var Ingredient = require('../controllers/controllerIngredient.js');

module.exports = function(router) {
    router.post('/ingredient/create', Ingredient.createIngredient);
    router.get('/ingredient/get', Ingredient.getAllIngredients);
    router.get('/ingredient/get/:nomIngredient', Ingredient.getIngredientByName);
    router.put('/ingredient/update/:id', Ingredient.updateIngredient);
    router.delete('/ingredient/remove/:id', Ingredient.removeIngredient);
}