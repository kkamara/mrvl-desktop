import React from 'react'
import { useQuery, } from '../../utilities/methods'

const SimplePagination = ({ data, hideFields, }) => {
    const query = useQuery()
    let offset = 0

    let queryOffset = query.get('offset')
    if (queryOffset && !isNaN(parseInt(queryOffset))) {
        offset = parseInt(queryOffset)
    }
    
    let disableLeftPaginator = false,
        disableRightPaginator = false
    if (offset < 1) {
        disableLeftPaginator = true
    }
    if (data.count < data.limit) {
        disableRightPaginator = true
    }

    let uriEncodedFilters = ''
    if (
        typeof data.filters !== 'undefined' &&
        typeof data.filters === 'string' &&
        data.filters.length
    ) uriEncodedFilters += `&${data.filters}`

    const prevOffset = offset - 20
    const nextOffset = offset + 20

    const prevOffsetURL = new URL(window.location.href)
    if (null !== prevOffsetURL.searchParams.get('offset')) {
        prevOffsetURL.searchParams.set('offset', prevOffset)
    } else {
        prevOffsetURL.searchParams.append('offset', prevOffset)
    }

    const nextOffsetURL = new URL(window.location.href)
    if (null !== nextOffsetURL.searchParams.get('offset')) {
        nextOffsetURL.searchParams.set('offset', nextOffset)
    } else {
        nextOffsetURL.searchParams.append('offset', nextOffset)
    }

    if (hideFields && null === nextOffsetURL.searchParams.get('hideFields')) {
        nextOffsetURL.searchParams.append('hideFields', hideFields)
    }
    if (hideFields && null === prevOffsetURL.searchParams.get('hideFields')) {
        prevOffsetURL.searchParams.append('hideFields', hideFields)
    }

    const leftPaginateBtnClick = e => {
        if (disableLeftPaginator) return
        window.location.href = prevOffsetURL.href
    }

    const rightPaginateBtnClick = e => {
        if (disableRightPaginator) return
        window.location.href = nextOffsetURL.href
    }
    
    return <>
        <nav aria-label='Comic pagination'>
            <ul className='pagination justify-content-center'>
                <li onClick={leftPaginateBtnClick} className={`page-item ${disableLeftPaginator ? 'disabled' : ''}`}>
                    <a className='page-link' href={prevOffsetURL.href}>Previous</a>
                </li>
                <li onClick={rightPaginateBtnClick} className={`page-item ${disableRightPaginator ? 'disabled' : ''}`}>
                    <a className='page-link' href={nextOffsetURL.href}>Next</a>
                </li>
            </ul>
        </nav>
    </>
}

export default SimplePagination
