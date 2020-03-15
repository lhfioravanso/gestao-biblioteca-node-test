let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
const Constants = require('../../api/utils/constants')
let should = chai.should();
chai.use(chaiHttp);

let CATEGORY_ID;
describe('# Testing Category Endpoints: ', () => {

  describe('/POST', () => {
    it('it should create a category', (done) => {
      
      const category = {
        name: 'Drama'
      }

      chai.request(server)
          .post('/api/categories')
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(category)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.category.should.have.property('id');
            CATEGORY_ID = res.body.category.id;
            done();
          });
    });

    it('it should not create a category with incomplete parameters', (done) => {
      
      const category = {
      }

      chai.request(server)
          .post('/api/categories')
          .set('Accept', 'application/json')
          .send(category)
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
    });
  });

  describe('/GET', () => {
      it('it should get all categories', (done) => {
        chai.request(server)
            .get('/api/categories')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.categories.should.be.a('array');
              res.body.categories[0].should.have.property('id');
              res.body.categories[0].should.have.property('name');
              done();
            });
      });

      it('it should get a single category', (done) => {
        chai.request(server)
            .get('/api/categories/' + CATEGORY_ID)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.category.should.have.property('id');
              res.body.category.should.have.property('name');
              done();
            });
      });

      it('it should not get a category with invalid id', (done) => {
        chai.request(server)
            .get('/api/categories/' + 0)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('message').eql(Constants.CATEGORY_NOT_FOUND);
              done();
            });
      });
  });

  describe('/PUT', () => {
    it('it should update a category', (done) => {

      const categoryDTO = {
        name: "New Category"
      }

      chai.request(server)
          .put('/api/categories/' + CATEGORY_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(categoryDTO)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.CATEGORY_SUCCESSFULLY_UPDATED);
            res.body.updatedCategory.should.have.property('name').eql(categoryDTO.name);
            res.body.updatedCategory.should.have.property('id');
            done();
          });
    });
    it('it should not update a category with invalid id', (done) => {
      
      const categoryDTO = {
        name: ""
      }

      chai.request(server)
          .put('/api/categories/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(categoryDTO)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.CATEGORY_NOT_FOUND);
            done();
          });
    });
  });

  describe('/DELETE', () => {
    /*
    it('it should delete a category', (done) => {
      chai.request(server)
          .delete('/api/categories/' + CATEGORY_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.CATEGORY_SUCCESSFULLY_DELETED);
            done();
          });
    });*/

    it('it should not delete a category with invalid id', (done) => {
      chai.request(server)
          .delete('/api/categories/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.CATEGORY_NOT_FOUND);
            done();
          });
    });
  });
  
});