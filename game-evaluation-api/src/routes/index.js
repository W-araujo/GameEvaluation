import express from 'express';

const GameController = require('../controllers/GameController');

const routes = express.Router();
 

routes.get('/game', GameController.index);
routes.get('/game/:id', GameController.uniqueIndex);
routes.post('/game', GameController.register);
routes.put('/game/:id', GameController.update);
routes.put('/game/delete/:id', GameController.delete);

module.exports = routes;