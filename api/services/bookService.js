import model from '../models';
const { books, categories } = model;
const attrs_book = ['id', 'title', 'isbn', 'year'];
const attrs_category = ['id', 'name'];

class BookService {

    static findAll(){
        return books.findAll({
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        })
    }

    static findById(id){
        return books.findOne({
            where: { id: id },
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        })
    }

    static findByIsbn(isbn){
        return books.findOne({
            where: {isbn: isbn}
        })
    }

    static addBook(bookDTO){    
        return books.create(bookDTO);
    }

    static deleteBook(bookToDelete) {
        return bookToDelete.destroy();
    }

    static updateBook(bookToUpdate, bookDTO) {
        return bookToUpdate.update(bookDTO);
    }    
}

export default BookService;