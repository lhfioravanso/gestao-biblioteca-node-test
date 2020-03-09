import BookService from '../services/bookService'

class BookCtrl {

    static async add(req, res) {
        
        const bookDTO = req.body;

        try {

            let bookAlreadyExists = await BookService.findByIsbn(bookDTO.isbn);
            if(bookAlreadyExists){
                return res.status(200).send({
                    success: false,
                    message: 'Já existe um livro com o ISBN ('+ bookDTO.isbn +') cadastrado!'
                }) 
            }

            let book = await BookService.addBook(bookDTO);
            return res.status(201).send({
                success: true,
                message: 'Livro adicionado com sucesso.',
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
            let bookExists = await BookService.findById(req.params.id);
            if (bookExists) {
                let updatedBook = await BookService.updateBook(bookExists, bookDTO);
                return res.status(200).send({
                    success: true,
                    message: 'Livro atualizado com sucesso.',
                    updatedBook
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Livro não encontrado!'
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
            let bookExists = await BookService.findById(req.params.id);
            if (bookExists) {
                await BookService.deleteBook(bookExists);
                return res.status(200).send({
                    success: true,
                    message: 'Livro excluido com sucesso.'
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Livro não encontrado!'
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
            let books = await BookService.findAll();
            if (books) {
                return res.status(200).send({
                    success: true,
                    books: books
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: 'Nenhum livro encontrado.'
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
            let bookExists = await BookService.findById(req.params.id);
            if (bookExists) {
                return res.status(200).send({
                    success: true,
                    book: bookExists
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: 'Livro não encontrado!'
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