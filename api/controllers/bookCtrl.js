import model from '../models';
const { validationResult } = require('express-validator/check');
const { books, categories } = model;
const attrs_book = ['id', 'title', 'isbn', 'year'];
const attrs_category = ['id', 'name'];

class BookCtrl {

    static add(req, res) {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { title, isbn, category_id, year } = req.body;


        books.findOne({
            where: {isbn: isbn}
        }).then(bookData => {

            if(bookData){
                return res.status(200).send({
                    success: false,
                    message: 'Já existe um livro com o ISBN ('+ bookData.isbn +') cadastrado!'
                }) 
            }

            return books
            .create({
                title,
                isbn,
                category_id,
                year
            })
            .then(bookData => res.status(201).send({
                    success: true,
                    message: 'Livro adicionado com sucesso.',
                    bookData
            }))
            .catch(error => res.status(500).send({
                success: false,
                message: error
            }))

        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static update(req, res) {

        const { title, isbn, category_id, year } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        books.findOne({
            where: { id: req.params.id }
        }).then(bookData => {
            if(bookData) {
                return bookData
                .update({
                    title,
                    isbn,
                    category_id,
                    year
                })
                .then(updatedBook => res.status(200).send({
                        success: true,
                        message: 'Livro atualizado com sucesso.',
                        updatedBook
                }))
                .catch(error => res.status(500).send({
                    success: false,
                    message: error
                }))
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Livro não encontrado!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static delete(req, res) {
        books.findOne({
            where: { id: req.params.id }
        }).then(bookData => {
            if(bookData) {
                return bookData.destroy()
                .then(res.status(200).send({
                    success: true,
                    message: 'Livro excluido com sucesso.'
                }))
                .catch(error => res.status(500).send({
                    success: false,
                    message: error
                }))
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Livro não encontrado!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static findAll(req, res){
        return books.findAll({
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        })
        .then(booksData => {
            if (!booksData || booksData.length <= 0){
                return res.status(200).send({
                    success: false,
                    message: 'Nenhum livro encontrado.'
                })
            } else {
                return res.status(200).send({
                    success: true,
                    books: booksData
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static findById(req, res){
        return books.findOne({
            where: { id: req.params.id },
            attributes: attrs_book,
            include: [
                { model: categories, attributes: attrs_category}
            ]
        }).then(bookData => {
            if (bookData) {
                return res.status(200).send({
                    success: true,
                    bookData
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: 'Livro não encontrado!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }
}

export default BookCtrl;