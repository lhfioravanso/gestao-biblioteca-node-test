let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
const Constants = require('../../api/utils/constants')
let should = chai.should();
chai.use(chaiHttp);

let BOOK_ID;
describe('# Testing Book Endpoints: ', () => {

  describe('/POST', () => {
    it('it should create a book', (done) => {
      
      const book = {
        isbn: '23456',
        title: 'teste',
        year: '2010',
        category_id: 1
      }

      chai.request(server)
          .post('/api/books')
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(book)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.book.should.have.property('id');
            BOOK_ID = res.body.book.id;
            done();
          });
    });

    it('it should not create a book with incomplete parameters', (done) => {
      
      const book = {
        isbn: '23456',
        title: 'teste',
        year: '2010'
      }

      chai.request(server)
          .post('/api/books')
          .set('Accept', 'application/json')
          .send(book)
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
    });
  });

  describe('/GET', () => {
      it('it should get all books', (done) => {
        chai.request(server)
            .get('/api/books')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.books.should.be.a('array');
                  res.body.books[0].should.have.property('id');
                  res.body.books[0].should.have.property('title');
                  res.body.books[0].should.have.property('isbn');
                  res.body.books[0].should.have.property('year');
                  res.body.books[0].category.should.have.property('id');
                  res.body.books[0].category.should.have.property('name');
              done();
            });
      });

      it('it should get a single book', (done) => {
        chai.request(server)
            .get('/api/books/' + BOOK_ID)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.book.should.have.property('id');
                  res.body.book.should.have.property('title');
                  res.body.book.should.have.property('isbn');
                  res.body.book.should.have.property('year');
                  res.body.book.category.should.have.property('id');
                  res.body.book.category.should.have.property('name');
              done();
            });
      });

      it('it should not get a book with invalid id', (done) => {
        const id = 0;
        chai.request(server)
            .get('/api/books/' + id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('message').eql(Constants.BOOK_NOT_FOUND);
              done();
            });
      });
  });

  describe('/PUT', () => {
    it('it should update a book', (done) => {

      const bookDTO = {
        title: "New Title"
      }

      chai.request(server)
          .put('/api/books/' + BOOK_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(bookDTO)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.BOOK_SUCCESSFULLY_UPDATED);
            res.body.updatedBook.should.have.property('title').eql(bookDTO.title);
            res.body.updatedBook.should.have.property('id');
            done();
          });
    });
    it('it should not update a book with invalid id', (done) => {
      
      const bookDTO = {
        title: ""
      }

      chai.request(server)
          .put('/api/books/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .send(bookDTO)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.BOOK_NOT_FOUND);
            done();
          });
    });
  });

  describe('/DELETE', () => {
    it('it should delete a book', (done) => {
      chai.request(server)
          .delete('/api/books/' + BOOK_ID)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql(Constants.BOOK_SUCCESSFULLY_DELETED);
            done();
          });
    });

    it('it should not delete a book with invalid id', (done) => {
      chai.request(server)
          .delete('/api/books/' + 0)
          .set('Accept', 'application/json')
          .set('x-access-token', process.env.TOKEN_AUTH)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('message').eql(Constants.BOOK_NOT_FOUND);
            done();
          });
    });
  });
  
});