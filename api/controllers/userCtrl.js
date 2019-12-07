import model from '../models';
import AuthMiddleware from '../auth/authMiddleware';

const sequelize = require('sequelize');
const { users } = model;
const attrs = [ 'id', 'email', 'name', 'phone_number', 
    [sequelize.fn('date_part', 'year', sequelize.fn('age', sequelize.col('birth_date'))), 'age']
];

class UserCtrl {

    static add(req, res) {
        const { email, name, password, birth_date, phone_number } = req.body;

        if (!email || !name || !password || !birth_date || !phone_number) {
            return res.status(500).send({
                success: false,
                message: 'Parametros não informados!'
            })
        }

        users.findOne({
            where: { email: email }
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
                birth_date, 
                phone_number
            })
            .then(userData => res.status(200).send({
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

    static update(req, res) {

        const { name, birth_date, phone_number } = req.body;

        if (!name & !birth_date & !phone_number) {
            return res.status(500).send({
                success: false,
                message: 'Nenhum dado foi informado para atualizar!'
            })
        }

        users.findOne({
            where: { id: req.params.id }
        }).then(userData => {
            if(userData) {
                return userData
                .update({
                    name,
                    birth_date,
                    phone_number
                })
                .then(updatedUser => res.status(200).send({
                        success: true,
                        message: 'Usuário atualizado com sucesso.',
                        updatedUser
                }))
                .catch(error => res.status(500).send({
                    success: false,
                    message: error
                }))
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Usuário não encontrado!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static delete(req, res) {
        users.findOne({
            where: { id: req.params.id }
        }).then(userData => {
            if(userData) {
                return userData.destroy()
                .then(res.status(200).send({
                    success: true,
                    message: 'Usuário excluido com sucesso.'
                }))
                .catch(error => res.status(500).send({
                    success: false,
                    message: error
                }))
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Usuário não encontrado!'
                })
            }
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

    static findAll(req, res){
        return users.findAll({ 
            attributes: attrs
        }).then(usersData => {
            if (!usersData || usersData.length <= 0){
                return res.status(500).send({
                    success: false,
                    message: 'Nenhum usuário encontrado.'
                })
            } else {
                return res.status(200).send({
                    success: true,
                    users: usersData
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static findById(req, res){
        return users.findOne({
            where: { id: req.params.id },
            attributes: attrs
        }).then(userData => {
            if (userData) {
                return res.status(200).send({
                    success: true,
                    userData
                })
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Usuário não encontrado!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

}

export default UserCtrl;