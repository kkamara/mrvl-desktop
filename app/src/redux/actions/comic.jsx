import { comicActions, } from '../reducers/types'
import marvelService from "../../service/marvelService"

const STORAGE_KEY = 'fav-comic-ids'

export function favComic(id) {
    return async dispatch => {
        dispatch(request(comicActions.FAVOURITE_COMIC_PENDING))

        let favComics = [id,]
        let storedComics = localStorage.getItem(STORAGE_KEY)
        if (null !== storedComics) {
            try {
                storedComics = JSON.parse(storedComics)
                favComics = [ ...storedComics, ...favComics, ]
            } catch (err) {
                return dispatch(
                    error(comicActions.FAVOURITE_COMIC_ERROR, err.message)
                )
            }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favComics))
        
        dispatch(
            success(comicActions.FAVOURITE_COMIC_SUCCESS, { ids: favComics, })
        )

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

export function unFavComic(id) {
    return async dispatch => {
        dispatch(request(comicActions.UNFAVOURITE_COMIC_PENDING))

        let storedComics = localStorage.getItem(STORAGE_KEY)
        if (null === storedComics) {
            return dispatch(
                success(comicActions.UNFAVOURITE_COMIC_SUCCESS, { ids: [], })
            )
        }

        try {
            storedComics = JSON.parse(storedComics)
        } catch (err) {
            return dispatch(
                error(comicActions.UNFAVOURITE_COMIC_ERROR, err.message)
            )
        }

        storedComics = storedComics.filter(comicID => comicID !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedComics))
        
        dispatch(
            success(comicActions.UNFAVOURITE_COMIC_SUCCESS, { ids: storedComics, })
        )

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

export function getFavComics(fetchFavItems=false) {
    return async dispatch => {
        dispatch(request(comicActions.GET_FAVOURITE_COMICS_PENDING))

        let favComics = localStorage.getItem(STORAGE_KEY)
        if (null === favComics) {
            favComics = []
            return dispatch(
                success(comicActions.GET_FAVOURITE_COMICS_SUCCESS, { items: [], })
            )
        } else {
            try {
                favComics = JSON.parse(favComics)
            } catch (err) {
                return dispatch(
                    error(comicActions.GET_FAVOURITE_COMICS_ERROR, err.message)
                )
            }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favComics))

        let result = []
        
        if (fetchFavItems) {
            await (new marvelService()).getFavComics(favComics)
                .then(json => {
                    result = json
                })
                .catch(err => {
                    return dispatch(error(comicActions.GET_FAVOURITE_COMICS_ERROR, err.message))
                })
        }

        dispatch(
            success(
                comicActions.GET_FAVOURITE_COMICS_SUCCESS, 
                { ids: favComics, items: result, },
            )
        )

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
