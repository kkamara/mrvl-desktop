import { comicActions, } from '../reducers/types'
import marvelService from "../../service/marvelService"

export function getComic(id) {
    return async dispatch => {
        dispatch(request(comicActions.GET_COMIC_PENDING))
        
        await (new marvelService()).getComic(id)
            .then(json => {
                dispatch(
                    success(comicActions.GET_COMIC_SUCCESS, json.data.data)
                )
            })
            .catch(err => {
                dispatch(error(comicActions.GET_COMIC_ERROR, err))
            })

        function request(type) {
            return {
                type
            }
        }

        function error(type, payload) {
            return {
                type,
                payload
            }
        }

        function success(type, payload) {
            return {
                type,
                payload
            }
        }
    }
}