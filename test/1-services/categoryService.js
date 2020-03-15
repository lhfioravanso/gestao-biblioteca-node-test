import CategoryService from '../../api/services/categoryService'
const assert = require('assert')
const categoryDTO = {
    name: 'test'
}

let category_id;

describe('# Testing Category Service: ', () => {
    it('it should create a category', async (done) => {
        let category = await CategoryService.addCategory(categoryDTO);
        assert(category.name === categoryDTO.name)
        category_id = category.id;
        done();
    });

    it('it should get a category by name', async (done) => {
        let category = await CategoryService.getCategoryByName(categoryDTO.name);
        assert(category.name === categoryDTO.name)
        done();
    });

    it('it should not get a category by nonexistent name', async (done) => {
        let category = await CategoryService.getCategoryByName('nonexistent_name');
        assert(category === null)
        done();
    });

    it('it should get a category by id', async (done) => {
        let category = await CategoryService.getCategoryById(category_id);
        assert(category.name === categoryDTO.name)
        done();
    });

    it('it should get all categorys', async (done) => {
        let categorys = await CategoryService.getAllCategories();
        assert(categorys.length >= 1)
        done();
    });

    it('it should update a category', async (done) => {
        let category = await CategoryService.updateCategory(category_id, {name: 'newName'});
        assert(category.name === 'newName')
        done();
    });

    it('it should delete a category', async (done) => {
        let category = await CategoryService.deleteCategory(category_id);
        done();
    });

});