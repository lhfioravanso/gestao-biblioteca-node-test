import BookService from '../../api/services/bookService'
const assert = require('assert')
const bookDTO = {
    isbn: '123456789',
    title: 'test',
    year: '2020',
    category_id: 1
}

let book_id;

describe('# Testing Book Service: ', () => {
    it('it should create a book', async (done) => {
        let book = await BookService.addBook(bookDTO);
        assert(book.title === bookDTO.title)
        book_id = book.id;
        done();
    });

    it('it should get a book by isbn', async (done) => {
        let book = await BookService.getBookByIsbn(bookDTO.isbn);
        assert(book.title === bookDTO.title)
        done();
    });

    it('it should not get a book by nonexistent isbn', async (done) => {
        let book = await BookService.getBookByIsbn('nonexistent_isbn');
        assert(book === null)
        done();
    });

    it('it should get a book by id', async (done) => {
        let book = await BookService.getBookById(book_id);
        assert(book.title === bookDTO.title)
        done();
    });

    it('it should get all books', async (done) => {
        let books = await BookService.getAllBooks();
        assert(books.length >= 1)
        done();
    });

    it('it should update a book', async (done) => {
        let book = await BookService.updateBook(book_id, {title: 'newName'});
        assert(book.title === 'newName')
        done();
    });

    it('it should delete a book', async (done) => {
        await BookService.deleteBook(book_id);
        done();
    });

});