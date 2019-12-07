import model from '../models';
const { favorite_books, users, books } = model;

class FavBookCtrl {

    static async add(req, res) {
        const { user_id, book_id } = req.body;

        if (!user_id || !book_id) {
            return res.status(500).send({
                success: false,
                message: 'Parametros não informados!'
            })
        }

        const userExists = await users.findOne({
            where: { id: user_id }
        });
        const bookExists = await books.findOne({
            where: { id: book_id }
        });

        if (!userExists) {
            return res.status(500).send({
                success: false,
                message: 'Usuário inexistente!'
            })
        }

        if (!bookExists) {
            return res.status(500).send({
                success: false,
                message: 'Livro inexistente!'
            })
        }

        favorite_books.findOne({
            where: { book_id: book_id, user_id: user_id }
        }).then(favData => {

            if(favData){
                return res.status(500).send({
                    success: false,
                    message: 'Este livro já está favoritado!'
                }) 
            }

            return favorite_books
            .create({
                user_id,
                book_id
            })
            .then(favData => res.status(200).send({
                    success: true,
                    message: 'Livro favoritado com sucesso.',
                    favData
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
}

export default FavBookCtrl;