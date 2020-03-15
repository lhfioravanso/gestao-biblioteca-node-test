let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
const Constants = require('../../api/utils/constants')
let should = chai.should();
chai.use(chaiHttp);

let USER_ID;
describe('# Testing User Endpoints: ', () => {

  describe('/POST', () => {
    it('it should create a user', (done) => {
      
      const user = {
        email: "test@test.com.br",
        name: "test",
        password: "test123",
        birth_date: "2000-01-01",
        phone_number: "123456789"
      }

      chai.request(server)
          .post('/api/users')
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.user.should.have.property('id');
            res.body.user.should.not.have.property('password');
            USER_ID = res.body.user.id;
            done();
          });
    });

    it('it should not create a user with incomplete parameters', (done) => {
      
      const user = {
        email: "test@test.com.br",
        name: "test",
        password: "test",
        birth_date: "2000-01-01"
      }

      chai.request(server)
          .post('/api/users')
          .set('Accept', 'application/json')
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
    });
  });

  describe('/GET', () => {
      it('it should get all users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.users.should.be.a('array');
                  res.body.users[0].should.not.have.property('password');
                  res.body.users[0].should.have.property('id');
                  res.body.users[0].should.have.property('email');
                  res.body.users[0].should.have.property('name');
                  res.body.users[0].should.have.property('age');
                  res.body.users[0].should.have.property('phone_number');
              done();
            });
      });

      it('it should get a single user', (done) => {
        chai.request(server)
            .get('/api/users/' + USER_ID)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.user.should.not.have.property('password');
                  res.body.user.should.have.property('id');
                  res.body.user.should.have.property('email');
                  res.body.user.should.have.property('name');
                  res.body.user.should.have.property('age');
                  res.body.user.should.have.property('phone_number');
              done();
            });
      });

      it('it should not get a user with invalid id', (done) => {
        const id = 0;
        chai.request(server)
            .get('/api/users/' + id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('message').eql(Constants.USER_NOT_FOUND);
              done();
            });
      });
  });

  describe('/PUT', () => {
    it('it should update a user', (done) => {

      const userDTO = {
        name: "newName"
      }

      chai.request(server)
          .put('/api/users/' + USER_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(userDTO)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.USER_SUCCESSFULLY_UPDATED);
            res.body.updatedUser.should.have.property('name').eql(userDTO.name);
            res.body.updatedUser.should.have.property('id');
            res.body.updatedUser.should.not.have.property('password');
            done();
          });
    });
    it('it should not update a user with invalid id', (done) => {
      
      const userDTO = {
        name: ""
      }

      chai.request(server)
          .put('/api/users/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(userDTO)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.USER_NOT_FOUND);
            done();
          });
    });
  });

  describe('/DELETE', () => {
    it('it should delete a user', (done) => {
      chai.request(server)
          .delete('/api/users/' + USER_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.USER_SUCCESSFULLY_DELETED);
            done();
          });
    });

    it('it should not delete a user with invalid id', (done) => {
      chai.request(server)
          .delete('/api/users/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.USER_NOT_FOUND);
            done();
          });
    });
  });

});