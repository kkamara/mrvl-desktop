import { paginationActions, } from "./types"

const initialState = {
    data: { offset: 0, search: null, },
    fetched: false,
    loading: false,
}
const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case paginationActions.GET_PAGINATION_PENDING:
		case paginationActions.SET_PAGINATION_PENDING:
            return { ...state, fetched: false, loading: true, }
        case paginationActions.GET_PAGINATION_ERROR:
		case paginationActions.SET_PAGINATION_ERROR:
            return {
                ...state,
                fetched: false,
                loading: true,
                error: action.payload
            }
        case paginationActions.GET_PAGINATION_SUCCESS:
		case paginationActions.SET_PAGINATION_SUCCESS:
            return {
                ...state,
                fetched: true,
                loading: false,
                data: action.payload,
            }
    }

    return state
}
export default paginationReducer
