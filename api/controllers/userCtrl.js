import UserService from '../services/userService'
import Constants from '../utils/constants'

class UserCtrl {

    static async add(req, res) {
        
        const userDTO = req.body;

        try {

            let userAlreadyExists = await UserService.getUserByEmail(userDTO.email);
            if(userAlreadyExists){
                return res.status(200).send({
                    success: false,
                    message: Constants.EMAIL_ALREADY_USED
                }) 
            }

            let user = await UserService.addUser(userDTO);
            user['password'] = undefined;

            return res.status(201).send({
                success: true,
                message: Constants.USER_SUCESSFULLY_ADDED,
                user
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async update(req, res) {

        const userDTO = req.body;

        try {
            let userExists = await UserService.getUserById(req.params.id);
            if (userExists) {
                let updatedUser = await UserService.updateUser(userExists, userDTO);
                updatedUser['password'] = undefined;
                
                return res.status(200).send({
                    success: true,
                    message: Constants.USER_SUCCESSFULLY_UPDATED,
                    updatedUser
                }) 
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

    static async delete(req, res) {
        try {
            let userExists = await UserService.getUserById(req.params.id);
            if (userExists) {
                await UserService.deleteUser(userExists);
                return res.status(200).send({
                    success: true,
                    message: Constants.USER_SUCCESSFULLY_DELETED
                }) 
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

    static async findAll(req, res){
        try {
            let users = await UserService.getAllUsers();
            if (users) {
                return res.status(200).send({
                    success: true,
                    users: users
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: Constants.NO_USER_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async findById(req, res){
        try {
            let userExists = await UserService.getUserById(req.params.id);
            if (userExists) {
                return res.status(200).send({
                    success: true,
                    user: userExists
                })
            } else {
                return res.status(200).send({
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

export default UserCtrl;