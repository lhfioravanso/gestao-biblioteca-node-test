import model from '../models';

const sequelize = require('sequelize');
const { users } = model;
const attrs = [ 'id', 'email', 'name', 'phone_number', 
    [sequelize.fn('date_part', 'year', sequelize.fn('age', sequelize.col('birth_date'))), 'age']
];

class UserService {

    static getUserByEmail(email){
        return users.findOne({
            where: { email: email }
        })
    }

    static getAllUsers(){
        return users.findAll({ 
            attributes: attrs
        });
    }

    static getUserById(id){
        return users.findOne({
            where: { id: id },
            attributes: attrs
        })
    }

    static addUser(userDTO){    
        return users.create(userDTO);
    }

    static deleteUser(userToDelete) {
        return userToDelete.destroy();
    }

    static updateUser(userToUpdate, userDTO) {
        return userToUpdate.update(userDTO);
    }    
}


export default UserService;