import UserCtrl from '../controllers/userCtrl';
import AuthMiddleware from '../auth/authMiddleware';
import BookCtrl from '../controllers/bookCtrl';
import FavBookCtrl from '../controllers/favBookCtrl';
import CategoriesCtrl from '../controllers/categoriesCtrl';

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Bem vindo à API da Biblioteca Test!'
    }));

    app.post('/api/users/authenticate', UserCtrl.authenticate);

    app.get('/api/users', UserCtrl.findAll);
    app.get('/api/users/:id', UserCtrl.findById);
    app.post('/api/users', AuthMiddleware.validateToken, UserCtrl.add);
    app.put('/api/users/:id', AuthMiddleware.validateToken, UserCtrl.update);
    app.delete('/api/users/:id', AuthMiddleware.validateToken, UserCtrl.delete);
    
    app.get('/api/books', BookCtrl.findAll);
    app.get('/api/books/:id', BookCtrl.findById);
    app.post('/api/books', AuthMiddleware.validateToken, BookCtrl.add);
    app.put('/api/books/:id', AuthMiddleware.validateToken, BookCtrl.update);
    app.delete('/api/books/:id', AuthMiddleware.validateToken, BookCtrl.delete);
    
    app.post('/api/favorites', AuthMiddleware.validateToken, FavBookCtrl.add);

    app.get('/api/categories', CategoriesCtrl.findAll);
    app.get('/api/categories/:id', CategoriesCtrl.findById);
    app.post('/api/categories', AuthMiddleware.validateToken, CategoriesCtrl.add);
    app.delete('/api/categories/:id', AuthMiddleware.validateToken, CategoriesCtrl.delete);
    
};