import React, { useEffect, } from 'react'
import { connect, } from "react-redux"

import { getPagination, setPagination, } from "../../redux/actions/pagination"

const SimplePagination = ({
	setPagination,
	getPagination,
	pagination, 
	data, 
}) => {
	useEffect(() => {
		const loadPagination = () => {
			getPagination()
		}
		loadPagination()
	}, [getPagination, pagination.data.offset,])
		
	let disableLeftPaginator = false,
      disableRightPaginator = false
  if (pagination.data.offset < 1) {
      disableLeftPaginator = true
  }
  if (data.count < data.limit) {
      disableRightPaginator = true
  }

  const prevOffset = pagination.data.offset - 20
  const nextOffset = pagination.data.offset + 20

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
