import { searchComicsActions, } from "../reducers/types"
import marvelService from "../../service/marvelService"

export function getSearchComics(filters, offset) {
    return async dispatch => {
        dispatch(request(searchComicsActions.SEARCH_COMICS_PENDING))
        await (new marvelService()).getSearchComics({...filters, offset,})
            .then(json => {
                dispatch(
                    success(searchComicsActions.SEARCH_COMICS_SUCCESS, json.data.data)
                )
            })
            .catch(err => {
                dispatch(error(searchComicsActions.SEARCH_COMICS_ERROR, err))
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
