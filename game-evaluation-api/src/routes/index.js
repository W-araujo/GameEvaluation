import express from 'express';

const GameController = require('../controllers/GameController');
const CategoryController = require('../controllers/CategoryController');

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


module.exports = routes;