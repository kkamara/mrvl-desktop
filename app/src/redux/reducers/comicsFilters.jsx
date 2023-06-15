import { comicsFiltersActions } from "./types"

const initialState = {
    data: false,
    fetched: false,
    loading: false,
}
const comicsFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case comicsFiltersActions.GET_COMICS_FILTERS_PENDING:
            return { ...state, fetched: false, loading: true, }
        case comicsFiltersActions.GET_COMICS_FILTERS_ERROR:
            return {
                ...state,
                fetched: false,
                loading: false,
                error: action.payload
            }
        case comicsFiltersActions.GET_COMICS_FILTERS_SUCCESS:
            return {
                ...state,
                fetched: true,
                loading: false,
                data: action.payload
            }
    }

    return state
}

export default comicsFiltersReducer
