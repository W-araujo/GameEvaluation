import express from 'express';

const GameController = require('../controllers/GameController');
const CategoryController = require('../controllers/CategoryController');
const GameCategoryController = require('../controllers/GameCategoryController');

const routes = express.Router();
 
//table game
routes.get('/game', GameController.index);
routes.get('/game/:id', GameController.uniqueIndex);
routes.post('/game', GameController.register);
routes.put('/game/:id', GameController.update);
routes.put('/game/delete/:id', GameController.delete);

//table category
routes.get('/category', CategoryController.index );
routes.post('/category', CategoryController.register);
routes.put('/category/:id', CategoryController.delete);

//table GameCategory
routes.get('/game_category', GameCategoryController.index);
routes.get('/game_category/:id', GameCategoryController.uniqueIndex);
routes.post('/game_category', GameCategoryController.register);



module.exports = routes;