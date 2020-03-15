import model from '../models';

const { books, categories } = model;
const attrs_book = ['id', 'title', 'isbn', 'year'];
const attrs_category = ['id', 'name'];

class BookService {

    static getAllBooks(){
        return books.findAll({
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        })
    }

    static getBookById(id){
        return books.findOne({
            where: { id: id },
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        })
    }

    static getBookByIsbn(isbn){
        return books.findOne({
            where: {isbn: isbn}
        })
    }

    static addBook(bookDTO){    
        return books.create(bookDTO);
    }

    static async deleteBook(book_id) {
        let bookToDelete = await this.getBookById(book_id);
        return bookToDelete.destroy();
    }

    static async updateBook(book_id, bookDTO) {
        let bookToUpdate = await this.getBookById(book_id);
        return bookToUpdate.update(bookDTO);
    }    
}

export default BookService;