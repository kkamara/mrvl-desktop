import { comicsActions, } from "../reducers/types"
import marvelService from "../../service/marvelService"

export function getComics(offset = null) {
    return async dispatch => {
        dispatch(request(comicsActions.GET_COMICS_PENDING))
        await (new marvelService()).getComics({offset,})
            .then(json => {
                dispatch(
                    success(comicsActions.GET_COMICS_SUCCESS, json.data.data)
                )
            })
            .catch(err => {
                dispatch(error(comicsActions.GET_COMICS_ERROR, err))
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
