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

    static deleteFavorite(favoriteBookToDelete) {
        return favoriteBookToDelete.destroy();
    }

    static updateFavorite(favoriteBookToUpdate, favoriteBookDTO) {
        return favoriteBookToUpdate.update(favoriteBookDTO);
    } 

}


export default FavoriteBookService;