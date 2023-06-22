import { paginationActions, } from "./types"

const initialState = {
    data: { 
		  hideFields: false,
		  format: '',
		  formatType: '',
		  noVariants: false,
		  dateDescriptor: '',
		  dateRange: '',
		  title: '',
		  titleStartsWith: '',
		  startYear: '',
		  issueNumber: '',
		  diamondCode: '',
		  digitalID: '',
		  upc: '',
		  isbn: '',
		  ean: '',
		  issn: '',
		  hasDigitalIssue: '',
		  modifiedSince: '',
		  creators: '',
		  characters: '',
		  series: '',
		  events: '',
		  stories: '',
		  sharedAppearances: '',
		  collaborators: '',
		  orderBy: '',
		  limit: '',
			offset: 0,
		},
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
                data: { ...action.payload },
            }
    }

    return state
}
export default paginationReducer
