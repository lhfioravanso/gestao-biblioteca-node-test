let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
const Constants = require('../../api/utils/constants')

chai.use(chaiHttp);

describe('# Testing authenticated endpoints without token: ', () => {
    describe('/POST', () => {
        it('it should return token not provided when try to create a user', (done) => {
            const user = {
                email: "",
                name: "",
                password: "",
                birth_date: "",
                phone_number: ""
            }
        chai.request(server)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send(user)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });

        it('it should return token not provided when try to create a book', (done) => {
            const book = {
                title: "",
                isbn: "",
                category_id: "",
                year: ""
            }
        chai.request(server)
            .post('/api/books')
            .set('Accept', 'application/json')
            .send(book)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });

        it('it should return token not provided when try to create a category', (done) => {
            const category = {
                name: ""
            }
        chai.request(server)
            .post('/api/categories')
            .set('Accept', 'application/json')
            .send(category)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });

        it('it should return token not provided when try to favorite a book', (done) => {
            const favorite = {
                user_id: "",
                book_id: ""
            }
        chai.request(server)
            .post('/api/favorites')
            .set('Accept', 'application/json')
            .send(favorite)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });
    });
    describe('/PUT', () => {
        it('it should return token not provided when try to update a user', (done) => {
            const user = {
                name: ""
            }
        chai.request(server)
            .put('/api/users/1')
            .set('Accept', 'application/json')
            .send(user)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });

        it('it should return token not provided when try to update a book', (done) => {
            const book = {
                title: ""
            }
        chai.request(server)
            .put('/api/books/1')
            .set('Accept', 'application/json')
            .send(book)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });

        it('it should return token not provided when try to update a category', (done) => {
            const category = {
                name: ""
            }
        chai.request(server)
            .put('/api/categories/1')
            .set('Accept', 'application/json')
            .send(category)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message').eql(Constants.TOKEN_NOT_PROVIDED);
                done();
            });
        });
    });
});

describe('# Testing authentication endpoint: ', () => {
    it('it should successfully authenticate', (done) => {
        const user = {
            email: "admin",
            password: "admin"
        }
    chai.request(server)
        .post('/api/authenticate')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            
            process.env.TOKEN_AUTH = res.body.token;
            done();
        });
    });
    it('it should not authenticate with invalid credentials', (done) => {
        const user = {
            email: "admin",
            password: "admin123"
        }
    chai.request(server)
        .post('/api/authenticate')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            res.should.have.status(500);
            done();
        });
    });
});