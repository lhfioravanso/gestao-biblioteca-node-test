import AuthMiddleware from '../middlewares/auth';
import UserService from '../services/userService';
import Constants from '../utils/constants'

class AuthCtrl {

    static async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            let userExists = await UserService.getUserByEmail(email);
            if (userExists) {
                if (userExists.validatePassword(password)) {
                    let token = AuthMiddleware.generateToken(userExists.id);
                
                    return res.status(200).send({
                        success: true,
                        message: Constants.USER_SUCCESSFULLY_AUTHENTICATED,
                        token: token
                    })
                } else {
                    return res.status(500).send({
                        success: false,
                        message: Constants.INVALID_CREDENTIALS
                    })
                }
            } else {
                return res.status(500).send({
                    success: false,
                    message: Constants.USER_NOT_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }
    
}

export default AuthCtrl;