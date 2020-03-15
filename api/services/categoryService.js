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

    static async deleteCategory(category_id) {
        let categoryToDelete = await this.getCategoryById(category_id);
        return categoryToDelete.destroy();
    }

    static async updateCategory(category_id, categoryDTO) {
        let categoryToUpdate = await this.getCategoryById(category_id);
        return categoryToUpdate.update(categoryDTO);
    }    
}

export default CategoryService;