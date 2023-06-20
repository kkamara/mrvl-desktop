import { paginationActions, } from '../reducers/types'

export function getPagination() {
    return async dispatch => {
        dispatch(request(paginationActions.GET_PAGINATION_PENDING))

		const pagination = localStorage.getItem('pagination')
		console.log(typeof pagination)
        if (!pagination) {
			return dispatch(success(
				paginationActions.GET_PAGINATION_SUCCESS,
				{ offset: 0, },	
        	))
		}

		try {
			dispatch(success(
				paginationActions.GET_PAGINATION_SUCCESS,
				JSON.parse(pagination),	
	        ))
	   	} catch (err) {
			console.log(err.message)
			dispatch(error(
				paginationActions.GET_PAGINATION_ERROR,
				err.message,
			))
			dispatch(success(
				paginationActions.GET_PAGINATION_SUCCESS,
				{ offset: 0, },	
        	))
        	try {
		        localStorage.setItem('pagination', JSON.stringify({ offset: 0, }))
		        dispatch(success(
					paginationActions.GET_PAGINATION_SUCCESS,
		            { offset: 0, },
		        ))
		   	} catch (err) {
				console.log(err.message)
				dispatch(error(
					paginationActions.GET_PAGINATION_ERROR,
					err.message,
				))
		    }
	    }
        
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

export function setPagination(pagination) {
    return async dispatch => {
        dispatch(request(paginationActions.SET_PAGINATION_PENDING))
        
        try {
	        localStorage.setItem('pagination', JSON.stringify(pagination))
	        dispatch(success(
				paginationActions.SET_PAGINATION_SUCCESS,
	            pagination,
	        ))
	   	} catch (err) {
			console.log(err.message)
			dispatch(error(
				paginationActions.SET_PAGINATION_ERROR,
				err.message,
			))
	    }
        
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