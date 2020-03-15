import UserService from '../../api/services/userService'
const assert = require('assert')
const userDTO = {
    email: 'test@test.com',
    name: 'test',
    password: 'test123',
    birth_date: '2000-01-01',
    phone_number: '123456789'
}

let user_id;

describe('# Testing User Service: ', () => {
    it('it should create a user with encrypted password', async (done) => {
        let user = await UserService.addUser(userDTO);
        assert(user.name === userDTO.name)
        assert(user.validatePassword(userDTO.password)) 
        user_id = user.id;
        done();
    });

    it('it should get a user by email', async (done) => {
        let user = await UserService.getUserByEmail(userDTO.email);
        assert(user.name === userDTO.name)
        done();
    });

    it('it should not get a user by nonexistent email', async (done) => {
        let user = await UserService.getUserByEmail('nonexistent_email');
        assert(user === null)
        done();
    });

    it('it should get a user by id', async (done) => {
        let user = await UserService.getUserById(user_id);
        assert(user.name === userDTO.name)
        done();
    });

    it('it should get all users', async (done) => {
        let users = await UserService.getAllUsers();
        assert(users.length >= 1)
        done();
    });

    it('it should update a user', async (done) => {
        let user = await UserService.updateUser(user_id, {name: 'newName'});
        assert(user.name === 'newName')
        done();
    });

    it('it should delete a user', async (done) => {
        await UserService.deleteUser(user_id);
        done();
    });

});