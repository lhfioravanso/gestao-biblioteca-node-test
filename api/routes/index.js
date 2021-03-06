import AuthMiddleware from '../middlewares/auth';
import ValidatorMiddleware from '../middlewares/validator';
import UserCtrl from '../controllers/userCtrl';
import BookCtrl from '../controllers/bookCtrl';
import FavoriteBookCtrl from '../controllers/favoriteBookCtrl';
import CategoriesCtrl from '../controllers/categoriesCtrl';
import AuthCtrl from '../controllers/authCtrl';

let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../swagger.json');

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Bem vindo à API da Biblioteca Test!'
    }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.post('/api/authenticate', ValidatorMiddleware.authenticateValidation(), ValidatorMiddleware.validate, AuthCtrl.authenticate);

    app.get('/api/users', UserCtrl.findAll);
    app.get('/api/users/:id', UserCtrl.findById);
    app.post('/api/users', ValidatorMiddleware.createUserValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, UserCtrl.add);
    app.put('/api/users/:id', ValidatorMiddleware.updateUserValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, UserCtrl.update);
    app.delete('/api/users/:id', AuthMiddleware.validateToken, UserCtrl.delete);
    
    app.get('/api/books', BookCtrl.findAll);
    app.get('/api/books/:id', BookCtrl.findById);
    app.post('/api/books', ValidatorMiddleware.createBookValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, BookCtrl.add);
    app.put('/api/books/:id', ValidatorMiddleware.updateBookValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, BookCtrl.update);
    app.delete('/api/books/:id', AuthMiddleware.validateToken, BookCtrl.delete);
    
    app.post('/api/favorites', ValidatorMiddleware.favoriteBookValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, FavoriteBookCtrl.add);

    app.get('/api/categories', CategoriesCtrl.findAll);
    app.get('/api/categories/:id', CategoriesCtrl.findById);
    app.post('/api/categories', ValidatorMiddleware.createCategoryValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, CategoriesCtrl.add);
    app.put('/api/categories/:id', ValidatorMiddleware.createCategoryValidation(), ValidatorMiddleware.validate, AuthMiddleware.validateToken, CategoriesCtrl.update);
    app.delete('/api/categories/:id', AuthMiddleware.validateToken, CategoriesCtrl.delete);
    
};