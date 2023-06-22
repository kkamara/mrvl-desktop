import React, { useEffect, useState, } from 'react'
import { connect } from 'react-redux'
import { Helmet, } from "react-helmet"
import ComicService from '../../service/comicService'

import { APP_NAME, } from "../../constants"
import Comic from '../Comic'
import SimplePagination from "../Pagination/SimplePagination"

import { getPagination, setPagination, } from "../../redux/actions/pagination"
import { getComicsFilters, } from "../../redux/actions/comicsFilters"
import { getSearchComics, } from "../../redux/actions/searchComics"
import Loader from "../Loader"
import './SearchComicsPage.scss'

const isValidClass = 'is-valid'
const isInvalidClass = 'is-invalid'

const comicService = new ComicService

const SearchComicsPage = ({
  getComicsFilters,
  getSearchComics,
  comicsFilters,
  searchComics,
  getPagination,
  setPagination,
  pagination,
}) => {
  const [isOpenStatesPerComic, setisOpenStatesPerComic] = useState(null)

	useEffect(() => {
		loadComicsFilters(pagination.data.offset)
    if (pagination.data.search && pagination.data.hideFields) {
      updateHideFields(pagination.data.hideFields)
    }
    
    let urlParamExists = false
    for(const key in pagination.data) {
      const val = pagination.data[key]
      if (val === null) {
        delete pagination.data[key]
      } else {
        urlParamExists = true
        if (key === 'noVariants' && val == 'true') {
          updateNoVariants(true)
        } if (key === 'hasDigitalIssue' && val == 'true') {
          updateHasDigitalIssue(true)
        } else {
          const setFunc = 'update' + key[0].toUpperCase() + key.slice(1) + '(' + `'${val}'` + ')'
          eval(setFunc)
        }
      }
    }
    if (urlParamExists) {
      const payload = {
	      format: pagination.data.format,
	      formatType: pagination.data.formatType,
	      noVariants: pagination.data.noVariants,
	      dateDescriptor: pagination.data.dateDescriptor,
	      dateRange: pagination.data.dateRange,
	      title: pagination.data.title,
	      titleStartsWith: pagination.data.titleStartsWith,
	      startYear: pagination.data.startYear,
	      issueNumber: pagination.data.issueNumber,
	      diamondCode: pagination.data.diamondCode,
	      digitalID: pagination.data.digitalID,
	      upc: pagination.data.upc,
	      isbn: pagination.data.isbn,
	      ean: pagination.data.ean,
	      issn: pagination.data.issn,
	      hasDigitalIssue: pagination.data.hasDigitalIssue,
	      modifiedSince: pagination.data.modifiedSince,
	      creators: pagination.data.creators,
	      characters: pagination.data.characters,
	      series: pagination.data.series,
	      events: pagination.data.events,
	      stories: pagination.data.stories,
	      sharedAppearances: pagination.data.sharedAppearances,
	      collaborators: pagination.data.collaborators,
	      orderBy: pagination.data.orderBy,
	      limit: pagination.data.limit,
	      offset: pagination.data.offset,
	    }
      loadSearchComics(payload, payload.offset)
    }
	}, [pagination.data.offset,])

	const loadComicsFilters = (paginationOffset) => {
		getComicsFilters(paginationOffset)
	}

	const loadSearchComics = (filters, paginationOffset) => {
		getSearchComics(filters, paginationOffset)
	}
	
	const updatePagination = subject => {
		const newPagination = { 
			...pagination.data,
			...subject,
		}
		setPagination(newPagination)
	}
	
	const updateFormat = subject => {
		updatePagination({ format: subject, })
	}
	
	const updateFormatType = subject => {
		updatePagination({ formatType: subject, })
	}
	
	const updateNoVariants = subject => {
		updatePagination({ noVariants: subject, })
	}
	
	const updateDateDescriptor = subject => {
		updatePagination({ dateDescriptor: subject, })
	}
	
	const updateDateRange = subject => {
		updatePagination({ dateRange: subject, })
	}
	
	const updateTitle = subject => {
		updatePagination({ title: subject, })
	}
	
	const updateTitleStartsWith = subject => {
		updatePagination({ titleStartsWith: subject, })
	}
	
	const updateStartYear = subject => {
		updatePagination({ startYear: subject, })
	}
	
	const updateIssueNumber = subject => {
		updatePagination({ issueNumber: subject, })
	}
	
	const updateDiamondCode = subject => {
		updatePagination({ diamondCode: subject, })
	}
	
	const updateDigitalID = subject => {
		updatePagination({ digitalID: subject, })
	}
	
	const updateUpc = subject => {
		updatePagination({ upc: subject, })
	}
	
	const updateIsbn = subject => {
		updatePagination({ isbn: subject, })
	}
	
	const updateEan = subject => {
		updatePagination({ ean: subject, })
	}
	
	const updateIssn = subject => {
		updatePagination({ issn: subject, })
	}
	
	const updateHasDigitalIssue = subject => {
		updatePagination({ hasDigitalIssue: subject, })
	}
	
	const updateModifiedSince = subject => {
		updatePagination({ modifiedSince: subject, })
	}
	
	const updateCreators = subject => {
		updatePagination({ creators: subject, })
	}
	
	const updateCharacters = subject => {
		updatePagination({ characters: subject, })
	}
	
	const updateSeries = subject => {
		updatePagination({ series: subject, })
	}
	
	const updateEvents = subject => {
		updatePagination({ events: subject, })
	}
	
	const updateStories = subject => {
		updatePagination({ stories: subject, })
	}
	
	const updateSharedAppearances = subject => {
		updatePagination({ sharedAppearances: subject, })
	}
	
	const updateCollaborators = subject => {
		updatePagination({ collaborators: subject, })
	}
	
	const updateOrderBy = subject => {
		updatePagination({ orderBy: subject, })
	}
	
	const updateLimit = subject => {
		updatePagination({ limit: subject, })
	}
	
	const updateOffset = subject => {
		updatePagination({ offset: parseInt(subject), })
	}
	
	const updateHideFields = subject => {
		updatePagination({ hideFields: subject, })
	}

	const {
    data: comicsFiltersData,
    fetched: comicsFiltersFetched,
    loading: comicsFiltersLoading,
  } = comicsFilters
	const {
    data: searchComicsData,
    fetched: searchComicsFetched,
    loading: searchComicsLoading,
  } = searchComics
	const pageTitle = `Search Page | ${APP_NAME}`

	const __renderHeaderTags = () => {
    return <Helmet>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="url" content={window.location.href} />
    </Helmet>
	}

  let comicsComponents = null
  if (
    !(!searchComicsData ||
    !(
      (typeof searchComicsData === 'object' && searchComicsData !== null) &&
      searchComicsData.results !== undefined
    ) ||
    !searchComicsData.results.length)
  ) {
    comicsComponents = searchComicsData.results.map((comic, key) =>
      <Comic 
        key={key} 
        comic={comic}
				disablePrevPaginator={comicService.shouldDisableLeftPaginator(key, searchComicsData.results)}
				disableNextPaginator={comicService.shouldDisableRightPaginator(key, searchComicsData.results)}
				openDefaultValue={isOpenStatesPerComic && isOpenStatesPerComic.length ? isOpenStatesPerComic[key] : false}
				openNextComic={() => { 
					setisOpenStatesPerComic(isOpenStatesPerComic => {
						const isOpenStatesPerComicNew = []
						searchComicsData.results.forEach((_, k) => {
							isOpenStatesPerComicNew[k] = false
						})
						isOpenStatesPerComicNew[key] = false; 
						isOpenStatesPerComicNew[key + 1] = true; 
						return isOpenStatesPerComicNew
					})
				}}
				openPrevComic={() => { 
					setisOpenStatesPerComic(isOpenStatesPerComic => {
						const isOpenStatesPerComicNew = []
						searchComicsData.results.forEach((_, k) => {
							isOpenStatesPerComicNew[k] = false
						})
						isOpenStatesPerComicNew[key] = false; 
						isOpenStatesPerComicNew[key - 1] = true; 
						return isOpenStatesPerComicNew				
					})
				}}
				onCloseCallback={() => { 
					setisOpenStatesPerComic(isOpenStatesPerComic => {
						const isOpenStatesPerComicNew = []
						searchComicsData.results.forEach((_, k) => {
							isOpenStatesPerComicNew[k] = false
						})
						return isOpenStatesPerComicNew
					})
				}}
      />
    )
  }

	const __renderComics = () => {
		if (
			!searchComicsData ||
			!(
				(typeof searchComicsData === 'object' && searchComicsData !== null) &&
				searchComicsData.results !== undefined
			) ||
			!searchComicsData.results.length
		) {
			return <p>No results to display your query.</p>
		}
		return comicsComponents
	}
  
  const handleSearchPageFormSubmit = e => {
		e.preventDefault()
		
    const payload = {
      format: pagination.data.format,
      formatType: pagination.data.formatType,
      noVariants: pagination.data.noVariants,
      dateDescriptor: pagination.data.dateDescriptor,
      dateRange: pagination.data.dateRange,
      title: pagination.data.title,
      titleStartsWith: pagination.data.titleStartsWith,
      startYear: pagination.data.startYear,
      issueNumber: pagination.data.issueNumber,
      diamondCode: pagination.data.diamondCode,
      digitalID: pagination.data.digitalID,
      upc: pagination.data.upc,
      isbn: pagination.data.isbn,
      ean: pagination.data.ean,
      issn: pagination.data.issn,
      hasDigitalIssue: pagination.data.hasDigitalIssue,
      modifiedSince: pagination.data.modifiedSince,
      creators: pagination.data.creators,
      characters: pagination.data.characters,
      series: pagination.data.series,
      events: pagination.data.events,
      stories: pagination.data.stories,
      sharedAppearances: pagination.data.sharedAppearances,
      collaborators: pagination.data.collaborators,
      orderBy: pagination.data.orderBy,
      limit: pagination.data.limit,
      offset: pagination.data.offset,
    }
    loadSearchComics(payload, payload.offset)
  }

	if (!comicsFiltersData && !comicsFiltersFetched && !comicsFiltersLoading) {
    return <Loader />
  } else if (!searchComicsFetched && searchComicsLoading) {
		return <Loader />
	}

	let content = null
	if (!searchComicsData && !searchComicsFetched && !searchComicsLoading) {
    content = null
  } else if (searchComicsFetched && !searchComicsLoading) {
		content = (
			<div className="container text-center">
				<div className="content-header">
					<SimplePagination data={searchComicsData} />
				</div>
				{__renderComics()}
				<div className="content-footer">
					<SimplePagination data={searchComicsData} />
				</div>
			</div>
		)
	} else if (!searchComicsFetched && searchComicsLoading) {
		content = <Loader />
	} else {
		content = <div className="container">
			<div>Unknown error encountered</div>
		</div>
	}
  return <>
    {__renderHeaderTags()}
    <div className="container">
      <div className="form-group">
        {pagination.data.hideFields ? <button
          onClick={(e) => { updateHideFields(false) }}
          name='hideFieldsFalse'
          className='form-control btn btn-secondary float-right'
        >Show fields</button> : null}
        {!pagination.data.hideFields ? <button
          onClick={(e) => { updateHideFields(true) }}
          name='hideFieldsTrue'
          className='form-control btn btn-secondary float-right'
        >Hide fields</button> : null}
      </div>
      <form
        className="card bg-dark search-card"
        action=''
        method='GET'
        onSubmit={handleSearchPageFormSubmit}
      >
        <div className="card-body bg-dark">
          <div className="card-text bg-dark">
            <div className={pagination.data.hideFields ? 'd-none' : ''}>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.format ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.format}</span> :
                    </p>
                  </> :
                  null}
                <select
                  onChange={(e) => { updateFormat(e.target.value) }}
                  name='format'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.format ? isInvalidClass : ''}`}
                  value={pagination.data.format}
                  style={styles.input}
                >
                  <option value="">{comicsFiltersData.format && comicsFiltersData.format.description}</option>
                  {comicsFiltersData.format && comicsFiltersData.format.options.map((option, key) => (
                    <option key={key} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.formatType ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.formatType}</span> :
                    </p>
                  </> :
                  null}
                <select
                  onChange={(e) => { updateFormatType(e.target.value) }}
                  name='formatType'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.formatType ? isInvalidClass : ''}`}
                  value={pagination.data.formatType}
                  style={styles.input}
                >
                  <option value="">{comicsFiltersData.formatType && comicsFiltersData.formatType.description}</option>
                  {comicsFiltersData.formatType && comicsFiltersData.formatType.options.map((option, key) => (
                    <option key={key} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.noVariants ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.noVariants}</span> :
                    </p>
                  </> :
                  null}
                {comicsFiltersData.noVariants && comicsFiltersData.noVariants.description} <input 
                  type="checkbox" 
                  name="noVariants" 
                  className={`${searchComicsData && searchComicsData.error && searchComicsData.error.noVariants ? isInvalidClass : ''}`}
                  onChange={evt => { updateNoVariants(evt.target.checked) }}
                  value={pagination.data.noVariants}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.dateDescriptor ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.dateDescriptor}</span> :
                    </p>
                  </> :
                  null}
                <select
                  onChange={(e) => { updateDateDescriptor(e.target.value) }}
                  name='dateDescriptor'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.dateDescriptor ? isInvalidClass : ''}`}
                  value={pagination.data.dateDescriptor}
                  style={styles.input}
                >
                  <option value="">{comicsFiltersData.dateDescriptor && comicsFiltersData.dateDescriptor.description}</option>
                  {comicsFiltersData.dateDescriptor && comicsFiltersData.dateDescriptor.options.map((option, key) => (
                    <option key={key} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.dateRange ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.dateRange}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="dateRange">{comicsFiltersData.dateRange && comicsFiltersData.dateRange.description}</label>
                <input 
                  onChange={(e) => { updateDateRange(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.dateRange ? isInvalidClass : ''}`}
                  name='dateRange'
                  placeholder='Date range'
                  value={pagination.data.dateRange}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.title ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.title}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="title">{comicsFiltersData.title && comicsFiltersData.title.description}</label>
                <input 
                  onChange={(e) => { updateTitle(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.title ? isInvalidClass : ''}`}
                  name='title'
                  placeholder='Title'
                  value={pagination.data.title}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.titleStartsWith ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.titleStartsWith}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="titleStartsWith">{comicsFiltersData.titleStartsWith && comicsFiltersData.titleStartsWith.description}</label>
                <input 
                  onChange={(e) => { updateTitleStartsWith(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.titleStartsWith ? isInvalidClass : ''}`}
                  name='titleStartsWith'
                  placeholder='Title starts with...'
                  value={pagination.data.titleStartsWith}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.startYear ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.startYear}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="startYear">{comicsFiltersData.startYear && comicsFiltersData.startYear.description}</label>
                <input 
                  onChange={(e) => { updateStartYear(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.startYear ? isInvalidClass : ''}`}
                  name='startYear'
                  placeholder='Start year'
                  value={pagination.data.startYear}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.issueNumber ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.issueNumber}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="issueNumber">{comicsFiltersData.issueNumber && comicsFiltersData.issueNumber.description}</label>
                <input 
                  onChange={(e) => { updateIssueNumber(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.issueNumber ? isInvalidClass : ''}`}
                  name='issueNumber'
                  placeholder='Issue number'
                  value={pagination.data.issueNumber}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.diamondCode ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.diamondCode}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="diamondCode">{comicsFiltersData.diamondCode && comicsFiltersData.diamondCode.description}</label>
                <input 
                  onChange={(e) => { updateDiamondCode(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.diamondCode ? isInvalidClass : ''}`}
                  name='diamondCode'
                  placeholder='Diamond code'
                  value={pagination.data.diamondCode}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.digitalId ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.digitalId}</span> :
                    </p>
                    </> :
                  null}
                <label htmlFor="digitalId">{comicsFiltersData.digitalId && comicsFiltersData.digitalId.description}</label>
                <input 
                  onChange={(e) => { updateDigitalID(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.digitalId ? isInvalidClass : ''}`}
                  name='digitalId'
                  placeholder='Digital id'
                  value={pagination.data.digitalID}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.upc ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.upc}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="upc">{comicsFiltersData.upc && comicsFiltersData.upc.description}</label>
                <input 
                  onChange={(e) => { updateUpc(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.upc ? isInvalidClass : ''}`}
                  name='upc'
                  placeholder='UPC barcode'
                  value={pagination.data.upc}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.isbn ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.isbn}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="isbn">{comicsFiltersData.isbn && comicsFiltersData.isbn.description}</label>
                <input 
                  onChange={(e) => { updateIsbn(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.isbn ? isInvalidClass : ''}`}
                  name='isbn'
                  placeholder='ISBN number'
                  value={pagination.data.isbn}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.ean ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.ean}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="ean">{comicsFiltersData.ean && comicsFiltersData.ean.description}</label>
                <input 
                  onChange={(e) => { updateEan(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.ean ? isInvalidClass : ''}`}
                  name='ean'
                  placeholder='EAN number (The International Article Number or European Article Number)'
                  value={pagination.data.ean}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.issn ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.issn}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="issn">{comicsFiltersData.issn && comicsFiltersData.issn.description}</label>
                <input 
                  onChange={(e) => { updateIssn(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.issn ? isInvalidClass : ''}`}
                  name='issn'
                  placeholder='ISSN number (International Standard Serial Number)'
                  value={pagination.data.issn}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.hasDigitalIssue ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.hasDigitalIssue}</span> :
                    </p>
                  </> :
                  null}
                {comicsFiltersData.hasDigitalIssue && comicsFiltersData.hasDigitalIssue.description} <input 
                  type="checkbox" 
                  name="hasDigitalIssue" 
                  className={`${searchComicsData && searchComicsData.error && searchComicsData.error.hasDigitalIssue ? isInvalidClass : ''}`}
                  onChange={evt => { updateHasDigitalIssue(evt.target.checked) }}
                  value={pagination.data.hasDigitalIssue}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.modifiedSince ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.modifiedSince}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="modifiedSince">{comicsFiltersData.modifiedSince && comicsFiltersData.modifiedSince.description}</label>
                <input 
                  onChange={(e) => { updateModifiedSince(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.modifiedSince ? isInvalidClass : ''}`}
                  name='modifiedSince'
                  placeholder='Date modified since'
                  type='date'
                  value={pagination.data.modifiedSince}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.creators ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.creators}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="creators">{comicsFiltersData.creators && comicsFiltersData.creators.description}</label>
                <input 
                  onChange={(e) => { updateCreators(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.creators ? isInvalidClass : ''}`}
                  name='creators'
                  placeholder='creators'
                  value={pagination.data.creators}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.characters ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.characters}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="characters">{comicsFiltersData.characters && comicsFiltersData.characters.description}</label>
                <input 
                  onChange={(e) => { updateCharacters(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.characters ? isInvalidClass : ''}`}
                  name='characters'
                  placeholder='Characters'
                  value={pagination.data.characters}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.series ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.series}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="series">{comicsFiltersData.series && comicsFiltersData.series.description}</label>
                <input 
                  onChange={(e) => { updateSeries(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.series ? isInvalidClass : ''}`}
                  name='series'
                  placeholder='Series'
                  value={pagination.data.series}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.events ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.events}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="events">{comicsFiltersData.events && comicsFiltersData.events.description}</label>
                <input 
                  onChange={(e) => { updateEvents(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.events ? isInvalidClass : ''}`}
                  name='events'
                  placeholder='Events'
                  value={pagination.data.events}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.stories ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.stories}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="stories">{comicsFiltersData.stories && comicsFiltersData.stories.description}</label>
                <input 
                  onChange={(e) => { updateStories(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.stories ? isInvalidClass : ''}`}
                  name='stories'
                  placeholder='Stories'
                  value={pagination.data.stories}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.sharedAppearances ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.sharedAppearances}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="sharedAppearances">{comicsFiltersData.sharedAppearances && comicsFiltersData.sharedAppearances.description}</label>
                <input 
                  onChange={(e) => { updateSharedAppearances(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.sharedAppearances ? isInvalidClass : ''}`}
                  name='sharedAppearances'
                  placeholder='Shared appearances'
                  value={pagination.data.sharedAppearances}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.collaborators ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.collaborators}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="collaborators">{comicsFiltersData.collaborators && comicsFiltersData.collaborators.description}</label>
                <input 
                  onChange={(e) => { updateCollaborators(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.collaborators ? isInvalidClass : ''}`}
                  name='collaborators'
                  placeholder='Collaborators'
                  value={pagination.data.collaborators}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.orderBy ?
                  <>
                    <hr /> 
                    <p>                
                      <span className='btn btn-danger'>{searchComicsData.error.orderBy}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="orderBy">{comicsFiltersData.orderBy && comicsFiltersData.orderBy.description}</label>
                <input 
                  onChange={(e) => { updateOrderBy(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.orderBy ? isInvalidClass : ''}`}
                  name='orderBy'
                  placeholder='Order by'
                  value={pagination.data.orderBy}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.limit ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.limit}</span> :
                    </p>
                  </> :
                  null}
                <label htmlFor="limit">{comicsFiltersData.limit && comicsFiltersData.limit.description}</label>
                <input 
                  onChange={(e) => { updateLimit(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.limit ? isInvalidClass : ''}`}
                  name='limit'
                  placeholder='Limit'
                  value={pagination.data.limit}
                />
              </div>
              <div className="form-group">
                {searchComicsData && searchComicsData.error && searchComicsData.error.offset ?
                  <>
                    <hr /> 
                    <p>
                      <span className='btn btn-danger'>{searchComicsData.error.offset}</span>
                    </p>
                  </> :
                  null}
                <label htmlFor="offset">{comicsFiltersData.offset && comicsFiltersData.offset.description}</label>
                <input 
                  onChange={(e) => { updateOffset(e.target.value) }}
                  style={styles.input}
                  className={`form-control search-input ${searchComicsData && searchComicsData.error && searchComicsData.error.offset ? isInvalidClass : ''}`}
                  name='offset'
                  placeholder='Offset'
                  value={pagination.data.offset}
                />
              </div>
            </div>

            <div className="form-group w-100" style={styles.submitBtnContainer}>
              <input
                className="btn btn-info btn-lg"
                style={styles.submitBtn}
                type='submit'
                value='Go'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    {content}
  </>
}

const styles = {
  input: {
    backgroundColor: '#212529',
    borderColor: '#212529',
    color: '#fff',
    marginBottom: 20,
  },
  submitBtnContainer: {
    textAlign: 'right',
  },
  submitBtn: {
    color: '#fff',
  },
}

const mapStateToProps = state => ({
	pagination: state.pagination,
	comicsFilters: state.comicsFilters,
	searchComics: state.searchComics,
})
const mapDispatchToProps = dispatch => ({
	setPagination: pagination => dispatch(setPagination(pagination)),
	getPagination: () => dispatch(getPagination()),
	getComicsFilters: (filters, offset) => dispatch(getComicsFilters(offset)),
	getSearchComics: (filters, offset) => dispatch(getSearchComics(filters, offset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchComicsPage)
