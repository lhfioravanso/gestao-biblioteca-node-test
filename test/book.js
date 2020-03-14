process.env.NODE_ENV = 'development';

let books = require('../api/models/books');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Books', () => {
/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/books')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.books.should.be.a('array');
              done();
            });
      });
  });

});