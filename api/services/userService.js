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

    static async deleteUser(userId) {
        let userToDelete = await this.getUserById(userId);
        return userToDelete.destroy();
    }

    static async updateUser(userId, userDTO) {
        let userToUpdate = await this.getUserById(userId);
        return userToUpdate.update(userDTO);
    }    
}


export default UserService;