import { comicsFiltersActions, } from "../reducers/types"
import marvelService from "../../service/marvelService"

export function getComicsFilters() {
    return async dispatch => {
        dispatch(request(comicsFiltersActions.GET_COMICS_FILTERS_PENDING))
        await (new marvelService()).getComicsFilters()
            .then(json => {
                dispatch(
                    success(comicsFiltersActions.GET_COMICS_FILTERS_SUCCESS, json.data)
                )
            })
            .catch(err => {
                dispatch(error(comicsFiltersActions.GET_COMICS_FILTERS_ERROR, err))
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
