import FavoriteBookService from '../services/favoriteBookService'
import Constants from '../utils/constants'

class FavoriteBookCtrl {

    static async add(req, res) {
        
        const favoriteDTO = req.body;

        try {

            let favoriteAlreadyExists = await FavoriteBookService.getFavoriteByUserIdAndBookId(favoriteDTO.user_id, favoriteDTO.book_id);
            if(favoriteAlreadyExists){
                return res.status(200).send({
                    success: false,
                    message: Constants.FAVORITE_ALREADY_EXISTS
                }) 
            }

            let favorite = await FavoriteBookService.addFavorite(favoriteDTO);
            return res.status(201).send({
                success: true,
                message: Constants.FAVORITE_SUCESSFULLY_ADDED,
                favorite
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err
            })
        }
    }
}

export default FavoriteBookCtrl;