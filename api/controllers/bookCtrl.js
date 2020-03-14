import BookService from '../services/bookService'
import Constants from '../utils/constants'

class BookCtrl {

    static async add(req, res) {
        
        const bookDTO = req.body;

        try {

            let bookAlreadyExists = await BookService.getBookByIsbn(bookDTO.isbn);
            if(bookAlreadyExists){
                return res.status(200).send({
                    success: false,
                    message: Constants.BOOK_ALREADY_EXISTS_WITH_THE_ISBN_PROVIDED
                }) 
            }

            let book = await BookService.addBook(bookDTO);
            return res.status(201).send({
                success: true,
                message: Constants.BOOK_SUCESSFULLY_ADDED,
                book
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async update(req, res) {

        const bookDTO = req.body;

        try {
            let bookExists = await BookService.getBookById(req.params.id);
            if (bookExists) {
                let updatedBook = await BookService.updateBook(bookExists, bookDTO);
                return res.status(200).send({
                    success: true,
                    message: Constants.BOOK_SUCCESSFULLY_UPDATED,
                    updatedBook
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: Constants.BOOK_NOT_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async delete(req, res) {
        try {
            let bookExists = await BookService.getBookById(req.params.id);
            if (bookExists) {
                await BookService.deleteBook(bookExists);
                return res.status(200).send({
                    success: true,
                    message: Constants.BOOK_SUCCESSFULLY_DELETED
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: Constants.BOOK_NOT_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async findAll(req, res){
        try {
            let books = await BookService.getAllBooks();
            if (books) {
                return res.status(200).send({
                    success: true,
                    books: books
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: Constants.NO_BOOK_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async findById(req, res){
        try {
            let bookExists = await BookService.getBookById(req.params.id);
            if (bookExists) {
                return res.status(200).send({
                    success: true,
                    book: bookExists
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: Constants.BOOK_NOT_FOUND
                })
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }
}

export default BookCtrl;