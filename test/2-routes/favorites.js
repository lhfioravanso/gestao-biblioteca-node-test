let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
const Constants = require('../../api/utils/constants')
let should = chai.should();
chai.use(chaiHttp);

const favoriteDTO = {
    user_id: 1,
    book_id: 1
}
describe('# Testing Favorite Book Endpoints: ', () => {
    describe('/POST', () => {
        it('it should favorite a book', (done) => {
            chai.request(server)
            .post('/api/favorites')
            .set('Accept', 'application/json')
            .set('x-access-token', process.env.TOKEN_AUTH)
            .send(favoriteDTO)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.favorite.should.have.property('id');
              done();
            });
        });

        it('it should not favorite a book already favorited', (done) => {
            chai.request(server)
            .post('/api/favorites')
            .set('Accept', 'application/json')
            .set('x-access-token', process.env.TOKEN_AUTH)
            .send(favoriteDTO)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message').eql(Constants.FAVORITE_ALREADY_EXISTS);
              done();
            });
        });

        it('it should not favorite a book with invalid book_id', (done) => {
            favoriteDTO.book_id = 0;
            chai.request(server)
            .post('/api/favorites')
            .set('Accept', 'application/json')
            .set('x-access-token', process.env.TOKEN_AUTH)
            .send(favoriteDTO)
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });
    });
});