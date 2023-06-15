import { comicActions, } from "./types"

const initialState = {
    comic: false,
    fetched: false,
    loading: false,
}
const comicReducer = (state = initialState, action) => {
    switch (action.type) {
        case comicActions.GET_COMIC_PENDING:
            return { ...state, fetched: false, loading: true, }
        case comicActions.GET_COMIC_ERROR:
            return {
                ...state,
                fetched: false,
                loading: true,
                error: action.payload
            }
        case comicActions.GET_COMIC_SUCCESS:
            return {
                ...state,
                fetched: true,
                loading: false,
                comic: action.payload,
            }
    }

    return state
}
export default comicReducer
