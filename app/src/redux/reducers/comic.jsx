import { comicActions, } from "./types"

const initialState = {
    favComics: {
        ids: [],
        items: [],
    },
    fetched: false,
    loading: false,
}
const comicReducer = (state = initialState, action) => {
    switch (action.type) {
        case comicActions.FAVOURITE_COMIC_PENDING:
        case comicActions.UNFAVOURITE_COMIC_PENDING:
        case comicActions.GET_FAVOURITE_COMICS_PENDING:
            return { ...state, fetched: false, loading: true, }
        case comicActions.FAVOURITE_COMIC_ERROR:
        case comicActions.UNFAVOURITE_COMIC_ERROR:
        case comicActions.GET_FAVOURITE_COMICS_ERROR:
            return {
                ...state,
                fetched: false,
                loading: true,
                error: action.payload
            }
        case comicActions.FAVOURITE_COMIC_SUCCESS:
        case comicActions.UNFAVOURITE_COMIC_SUCCESS:
            let items = initialState.favComics.items
            if (state.favComics.items.length) {
                items = state.favComics.items.filter(
                    ({ id, }) => action.payload.ids.includes(id)
                )
            }
            return {
                ...state,
                fetched: true,
                loading: false,
                favComics: {
                    ...state.favComics,
                    ...action.payload,
                    items: items,
                },
            }
        case comicActions.GET_FAVOURITE_COMICS_SUCCESS:
            return {
                ...state,
                fetched: true,
                loading: false,
                favComics: {
                    ...state.favComics,
                    ...action.payload,
                },
            }
    }

    return state
}
export default comicReducer
