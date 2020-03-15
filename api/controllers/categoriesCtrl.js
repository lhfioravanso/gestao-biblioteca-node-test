import CategoryService from "../services/categoryService";
import Constants from '../utils/constants'

class CategoriesCtrl {

    static async add(req, res) {

        const categoryDTO = req.body;

        try {

            let categoryAlreadyExists = await CategoryService.getCategoryByName(categoryDTO.name);
            if(categoryAlreadyExists){
                return res.status(200).send({
                    success: false,
                    message: Constants.CATEGORY_ALREADY_EXISTS
                }) 
            }

            let category = await CategoryService.addCategory(categoryDTO);
            return res.status(201).send({
                success: true,
                message: Constants.CATEGORY_SUCESSFULLY_ADDED,
                category
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }

    static async update(req, res) {

        const categoryDTO = req.body;

        try {
            let categoryExists = await CategoryService.getCategoryById(req.params.id);
            if (categoryExists) {
                let updatedCategory = await CategoryService.updateCategory(categoryExists.id, categoryDTO);
                return res.status(200).send({
                    success: true,
                    message: Constants.CATEGORY_SUCCESSFULLY_UPDATED,
                    updatedCategory
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: Constants.CATEGORY_NOT_FOUND
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
            let categoryExists = await CategoryService.getCategoryById(req.params.id);
            if (categoryExists) {
                await CategoryService.deleteCategory(categoryExists.id);
                return res.status(200).send({
                    success: true,
                    message: Constants.CATEGORY_SUCCESSFULLY_DELETED
                }) 
            } else {
                return res.status(500).send({
                    success: false,
                    message: Constants.CATEGORY_NOT_FOUND
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
            let categories = await CategoryService.getAllCategories();
            if (categories) {
                return res.status(200).send({
                    success: true,
                    categories: categories
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: Constants.NO_CATEGORY_FOUND
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
            let categoryExists = await CategoryService.getCategoryById(req.params.id);
            if (categoryExists) {
                return res.status(200).send({
                    success: true,
                    category: categoryExists
                })
            } else {
                return res.status(200).send({
                    success: false,
                    message: Constants.CATEGORY_NOT_FOUND
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

export default CategoriesCtrl;