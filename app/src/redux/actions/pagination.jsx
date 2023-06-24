import { paginationActions, } from '../reducers/types'

export function getPagination() {
	return async (dispatch, getState) => {
		dispatch(request(paginationActions.GET_PAGINATION_PENDING))
		const { 
			data: existingPaginationData,
		} = getState().pagination 
		const pagination = localStorage.getItem('pagination')
		if (!pagination) {
			return dispatch(success(
				paginationActions.GET_PAGINATION_SUCCESS,
				existingPaginationData,
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
				existingPaginationData,	
			))
			try {
				localStorage.setItem('pagination', JSON.stringify({ offset: 0, }))
				dispatch(success(
					paginationActions.GET_PAGINATION_SUCCESS,
					existingPaginationData,
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
				type,
			}
		}

		function error(type, payload) {
			return {
				type,
				payload,
			}
		}

		function success(type, payload) {
			return {
				type,
				payload,
			}
		}
  }
}

export function setPagination(pagination) {
	return async (dispatch, getState) => {
    dispatch(request(paginationActions.SET_PAGINATION_PENDING))
    const { data, } = getState().pagination;
    const newPagination = {
			...data,
			...pagination,
		}
		try {
			localStorage.setItem('pagination', JSON.stringify(newPagination))
			dispatch(success(
				paginationActions.SET_PAGINATION_SUCCESS,
				newPagination,
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
				type,
			}
    }
    
    function error(type, payload) {
			return {
				type,
				payload,
			}
    }

    function success(type, payload) {
			return {
				type,
				payload,
			}
    }
  }
}