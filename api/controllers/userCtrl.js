import model from '../models';
import AuthMiddleware from '../auth/authMiddleware';

const { users } = model;

class UserCtrl {

    static add(req, res) {
        const { email, name, password, age, phone_number } = req.body;

        if (!email || !name || !password || !age || !phone_number) {
            return res.status(500).send({
                success: false,
                message: 'Parametros não informados!'
            })
        }

        users.findOne({
            where: {email: email}
        }).then(userData => {

            if(userData){
                return res.status(500).send({
                    success: false,
                    message: 'O e-mail informado já foi utilizado!'
                }) 
            }

            return users
            .create({
                email,
                name,
                password,
                age, 
                phone_number
            })
            .then(userData => res.status(201).send({
                    success: true,
                    message: 'Usuário adicionado com sucesso.',
                    userData
            }))
            .catch(error => res.status(500).send({
                success: false,
                message: error
            }))

        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static authenticate(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Parametros não informados!'
            })
        }

        users.findOne({
            where: {email: email}
        }).then(userData => {

            if(!userData){
                return res.status(500).send({
                    success: false,
                    message: 'Usuário não localizado.'
                }) 
            }

            if (userData.password == password) {

                let token = AuthMiddleware.generateToken(userData.id);
            
                return res.status(200).send({
                    success: true,
                    message: 'Usuário autenticado com sucesso.',
                    token: token
                })
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Dados inválidos.'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
        
    }

}

export default UserCtrl;