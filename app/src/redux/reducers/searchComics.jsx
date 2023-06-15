import { searchComicsActions, } from "./types"

const initialState = {
    data: false,
    fetched: false,
    loading: false,
}
const searchComicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchComicsActions.SEARCH_COMICS_PENDING:
            return { ...state, fetched: false, loading: false }
        case searchComicsActions.SEARCH_COMICS_ERROR:
            return {
                ...state,
                fetched: false,
                loading: false,
                error: action.payload
            }
        case searchComicsActions.SEARCH_COMICS_SUCCESS:
            return {
                ...state,
                fetched: true,
                loading: false,
                data: action.payload
            }
    }

    return state
}

export default searchComicsReducer
