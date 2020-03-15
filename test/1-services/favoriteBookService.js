import FavoriteBookService from '../../api/services/favoriteBookService'
const assert = require('assert')
const favoriteBookDTO = {
    user_id: 1,
    book_id: 1
}

let favoriteBook_id;

describe('# Testing FavoriteBook Service: ', () => {
    it('it should create a favoriteBook', async (done) => {
        let favoriteBook = await FavoriteBookService.addFavorite(favoriteBookDTO);
        assert(favoriteBook.book_id === favoriteBookDTO.book_id)
        favoriteBook_id = favoriteBook.id;
        done();
    });

    it('it should get a favoriteBook by userId and bookId', async (done) => {
        let favoriteBook = await FavoriteBookService.getFavoriteByUserIdAndBookId(favoriteBookDTO.user_id, favoriteBookDTO.book_id);
        assert(favoriteBook.user_id === favoriteBookDTO.user_id)
        assert(favoriteBook.book_id === favoriteBookDTO.book_id)
        done();
    });

    it('it should not get a favoriteBook by nonexistent ids', async (done) => {
        let favoriteBook = await FavoriteBookService.getFavoriteByUserIdAndBookId(0,0);
        assert(favoriteBook === null)
        done();
    });

    it('it should get a favoriteBook by id', async (done) => {
        let favoriteBook = await FavoriteBookService.getFavoriteById(favoriteBook_id);
        assert(favoriteBook.user_id === favoriteBookDTO.user_id)
        assert(favoriteBook.book_id === favoriteBookDTO.book_id)
        done();
    });

    it('it should get all favoriteBooks', async (done) => {
        let favoriteBooks = await FavoriteBookService.getAllFavorites();
        assert(favoriteBooks.length >= 1)
        done();
    });

    it('it should update a favoriteBook', async (done) => {
        let favoriteBook = await FavoriteBookService.updateFavorite(favoriteBook_id, {user_id: 1});
        assert(favoriteBook.user_id === 1)
        done();
    });

    it('it should delete a favoriteBook', async (done) => {
        await FavoriteBookService.deleteFavorite(favoriteBook_id);
        done();
    });

});