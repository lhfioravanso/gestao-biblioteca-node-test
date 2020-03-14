import model from '../models';
const { categories } = model;

class CategoryService {

    static getCategoryByName(name){
        return categories.findOne({
            where: { name }
        })
    }

    static getAllCategories(){
        return categories.findAll();
    }

    static getCategoryById(id){
        return categories.findOne({
            where: { id: id }
        })
    }

    static addCategory(categoryDTO){    
        return categories.create(categoryDTO);
    }

    static deleteCategory(categoryToDelete) {
        return categoryToDelete.destroy();
    }

    static updateCategory(categoryToUpdate, categoryDTO) {
        return categoryToUpdate.update(categoryDTO);
    }    
}

export default CategoryService;