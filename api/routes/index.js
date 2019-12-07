import UserCtrl from '../controllers/userCtrl';
import AuthMiddleware from '../auth/authMiddleware';
import BookCtrl from '../controllers/bookCtrl';

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Bem vindo à API da Biblioteca Test!'
    }));

    app.post('/api/users/', UserCtrl.add);
    app.post('/api/users/login', UserCtrl.login);

    app.post('/api/books/', BookCtrl.add);
    app.put('/api/books/:id', BookCtrl.update);
    app.delete('/api/books/:id', BookCtrl.delete);
    app.get('/api/books/', BookCtrl.findAll);
    app.get('/api/books/:id', BookCtrl.findById);
};