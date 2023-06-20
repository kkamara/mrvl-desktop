import React, { useEffect, } from 'react'
import { connect, } from "react-redux"

import { getPagination, setPagination, } from "../../redux/actions/pagination"

const SimplePagination = ({
	setPagination,
	getPagination,
	pagination, 
	data, 
	hideFields,
}) => {		
	useEffect(() => {
		loadPagination()
	}, [pagination.data.offset,])
	
	const loadPagination = () => {
		getPagination()
	}
	
    const { 
		data: paginationData,
		fetched: paginationFetched,
		loading: paginationLoading,
	} = pagination
console.log(paginationData.offset, 'simplepagination')
    let disableLeftPaginator = false,
        disableRightPaginator = false
    if (paginationData.offset < 1) {
        disableLeftPaginator = true
    }
    if (data.count < data.limit) {
        disableRightPaginator = true
    }

    const prevOffset = paginationData.offset - 20
    const nextOffset = paginationData.offset + 20

    const leftPaginateBtnClick = e => {
        if (disableLeftPaginator) return
        setPagination({ offset: prevOffset, })
    }

    const rightPaginateBtnClick = e => {
        if (disableRightPaginator) return
        setPagination({ offset: nextOffset, })
    }
    
    return <>
        <nav aria-label='Comic pagination'>
            <ul className='pagination justify-content-center'>
                <li onClick={leftPaginateBtnClick} className={`page-item ${disableLeftPaginator ? 'disabled' : ''}`}>
                    <span className='page-link'>Previous</span>
                </li>
                <li onClick={rightPaginateBtnClick} className={`page-item ${disableRightPaginator ? 'disabled' : ''}`}>
                    <span className='page-link'>Next</span>
                </li>
            </ul>
        </nav>
    </>
}

const mapStateToProps = state => ({
	pagination: state.pagination,
})
const mapDispatchToProps = dispatch => ({
	getPagination: () => dispatch(getPagination()),
	setPagination: (pagination) => dispatch(setPagination(pagination)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SimplePagination)
