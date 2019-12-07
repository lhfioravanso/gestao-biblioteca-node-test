import model from '../models';

const { categories } = model;

class CategoriesCtrl {

    static add(req, res) {
        const { name } = req.body;

        if (!name) {
            return res.status(500).send({
                success: false,
                message: 'Parametros não informados!'
            })
        }

        categories.findOne({
            where: { name }
        }).then(categoryData => {

            if(categoryData){
                return res.status(500).send({
                    success: false,
                    message: 'Categoria existente.'
                }) 
            }

            return categories
            .create({
                name
            })
            .then(categoryData => res.status(200).send({
                    success: true,
                    message: 'Categoria adicionada com sucesso.',
                    categoryData
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

    static delete(req, res) {
        categories.findOne({
            where: { id: req.params.id }
        }).then(categoryData => {
            if(categoryData) {
                return categoryData.destroy()
                .then(res.status(200).send({
                    success: true,
                    message: 'Categoria excluida com sucesso.'
                }))
                .catch(error => res.status(500).send({
                    success: false,
                    message: error
                }))
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Categoria não encontrada!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static findAll(req, res){
        return categories.findAll()
        .then(categoryData => {
            if (!categoryData || categoryData.length <= 0){
                return res.status(500).send({
                    success: false,
                    message: 'Nenhuma categoria encontrada.'
                })
            } else {
                return res.status(200).send({
                    success: true,
                    categories: categoryData
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }

    static findById(req, res){
        return categories.findOne({
            where: { id: req.params.id }
        }).then(categoryData => {
            if (categoryData) {
                return res.status(200).send({
                    success: true,
                    categoryData
                })
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Categoria não encontrada!'
                })
            }
        }).catch(error => res.status(500).send({
            success: false,
            message: error
        }));
    }
}

export default CategoriesCtrl;