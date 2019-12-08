import model from '../models';
import AuthMiddleware from '../auth/authMiddleware';

const { users } = model;

class AuthCtrl {

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

            if (userData.validatePassword(password)) {
                let token = AuthMiddleware.generateToken(userData.id);
            
                return res.status(200).send({
                    success: true,
                    message: 'Usuário autenticado com sucesso.',
                    token: token
                })
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Senha inválida.'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }
    
}

export default AuthCtrl;