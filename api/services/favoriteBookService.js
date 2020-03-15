import model from '../models';
const { favorite_books } = model;

class FavoriteBookService {

    static getAllFavorites(){
        return favorite_books.findAll();
    }

    static getFavoriteById(id){
        return favorite_books.findOne({
            where: { id: id }
        })
    }

    static getFavoriteByUserIdAndBookId(userId, bookId){
        return favorite_books.findOne({
            where: { book_id: bookId, user_id: userId }
        })
    }

    static addFavorite(favoriteBookDTO){    
        return favorite_books.create(favoriteBookDTO);
    }

    static async deleteFavorite(favorite_id) {
        let favoriteBookToDelete = await this.getFavoriteById(favorite_id);
        return favoriteBookToDelete.destroy();
    }

    static async updateFavorite(favorite_id, favoriteBookDTO) {
        let favoriteBookToUpdate = await this.getFavoriteById(favorite_id);
        return favoriteBookToUpdate.update(favoriteBookDTO);
    } 

}


export default FavoriteBookService;