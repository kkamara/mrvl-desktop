import React, { useEffect, useState, } from 'react'
import { connect } from 'react-redux'
import { Helmet, } from "react-helmet"
import ComicService from '../../service/comicService'

import { useQuery, } from '../../utilities/methods'
import { APP_NAME, } from "../../constants"
import Comic from '../Comic'
import SimplePagination from "../Pagination/SimplePagination"

import { getComicsFilters, } from "../../redux/actions/comicsFilters"
import { getSearchComics, } from "../../redux/actions/searchComics"
import Loader from "../Loader"

const isValidClass = 'is-valid'
const isInvalidClass = 'is-invalid'

const comicService = new ComicService

const SearchComicsPage = ({
  getComicsFilters,
  getSearchComics,
  comicsFilters,
  searchComics,
}) => {
	const query = useQuery()
	let paginationOffset = 0

	let queryOffset = query.get('offset')
	if (queryOffset && !isNaN(parseInt(queryOffset))) {
    paginationOffset = parseInt(queryOffset)
	}

	const [isOpenStatesPerComic, setisOpenStatesPerComic] = useState(null)

  const [hideFields, setHideFields] = useState(false)
  const [format, setFormat] = useState('')
  const [formatType, setFormatType] = useState('')
  const [noVariants, setNoVariants] = useState(false)
  const [dateDescriptor, setDateDescriptor] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [title, setTitle] = useState('')
  const [titleStartsWith, setTitleStartsWith] = useState('')
  const [startYear, setStartYear] = useState('')
  const [issueNumber, setIssueNumber] = useState('')
  const [diamondCode, setDiamondCode] = useState('')
  const [digitalID, setDigitalID] = useState('')
  const [upc, setUpc] = useState('')
  const [isbn, setIsbn] = useState('')
  const [ean, setEan] = useState('')
  const [issn, setIssn] = useState('')
  const [hasDigitalIssue, setHasDigitalIssue] = useState('')
  const [modifiedSince, setModifiedSince] = useState('')
  const [creators, setCreators] = useState('')
  const [characters, setCharacters] = useState('')
  const [series, setSeries] = useState('')
  const [events, setEvents] = useState('')
  const [stories, setStories] = useState('')
  const [sharedAppearances, setSharedAppearances] = useState('')
  const [collaborators, setCollaborators] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [limit, setLimit] = useState('')
  const [offset, setOffset] = useState('')

	useEffect(() => {
		loadComicsFilters(paginationOffset)
    if (query.get('hideFields') === 'true') {
      setHideFields(true)
    }
    const payload = {
      format: query.get('format'),
      formatType: query.get('formatType'),
      noVariants: query.get('noVariants'),
      dateDescriptor: query.get('dateDescriptor'),
      dateRange: query.get('dateRange'),
      title: query.get('title'),
      titleStartsWith: query.get('titleStartsWith'),
      startYear: query.get('startYear'),
      issueNumber: query.get('issueNumber'),
      diamondCode: query.get('diamondCode'),
      digitalID: query.get('digitalID'),
      upc: query.get('upc'),
      isbn: query.get('isbn'),
      ean: query.get('ean'),
      issn: query.get('issn'),
      hasDigitalIssue: query.get('hasDigitalIssue'),
      modifiedSince: query.get('modifiedSince'),
      creators: query.get('creators'),
      characters: query.get('characters'),
      series: query.get('series'),
      events: query.get('events'),
      stories: query.get('stories'),
      sharedAppearances: query.get('sharedAppearances'),
      collaborators: query.get('collaborators'),
      orderBy: query.get('orderBy'),
      limit: query.get('limit'),
      offset: paginationOffset,
    }
    let urlParamExists = false
    for(const key in payload) {
      const val = payload[key]
      if (val === null) {
        delete payload[key]
      } else {
        urlParamExists = true
        if (key === 'noVariants' && val == 'true') {
          setNoVariants(true)
        } if (key === 'hasDigitalIssue' && val == 'true') {
          setHasDigitalIssue(true)
        } else {
          const setFunc = 'set' + key[0].toUpperCase() + key.slice(1) + '(' + `'${val}'` + ')'
          eval(setFunc)
        }
      }
    }
    if (urlParamExists) {
      // search comics with filters from url  
      loadSearchComics(payload, payload.offset)
    }
	}, [])

	const loadComicsFilters = (paginationOffset) => {
		getComicsFilters(paginationOffset)
	}

	const loadSearchComics = (filters, paginationOffset) => {
		getSearchComics(filters, paginationOffset)
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
  
  const handleSearchPageFormSubmit = () => {
    const payload = {
      format,
      formatType,
      noVariants,
      dateDescriptor,
      dateRange,
      title,
      titleStartsWith,
      startYear,
      issueNumber,
      diamondCode,
      digitalID,
      upc,
      isbn,
      ean,
      issn,
      hasDigitalIssue,
      modifiedSince,
      creators,
      characters,
      series,
      events,
      stories,
      sharedAppearances,
      collaborators,
      orderBy,
      limit,
      offset,
    }
    loadSearchComics(payload, offset)
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
					<SimplePagination hideFields={hideFields} data={searchComicsData} />
				</div>
				{__renderComics()}
				<div className="content-footer">
					<SimplePagination hideFields={hideFields} data={searchComicsData} />
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
        {hideFields ? <button
          onClick={(e) => { setHideFields(false) }}
          name='hideFieldsFalse'
          className='form-control btn btn-secondary float-right'
        >Show fields</button> : null}
        {!hideFields ? <button
          onClick={(e) => { setHideFields(true) }}
          name='hideFieldsTrue'
          className='form-control btn btn-secondary float-right'
        >Hide fields</button> : null}
      </div>
      <form
        className="card bg-dark"
        action=''
        method='GET'
        onSubmit={handleSearchPageFormSubmit}
      >
        <div className="card-body bg-dark">
          <div className="card-text bg-dark">
            <div className={hideFields ? 'd-none' : ''}>
              <input type="hidden" name='hideFields' value={hideFields} />
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
                  onChange={(e) => { setFormat(e.target.value) }}
                  name='format'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.format ? isInvalidClass : ''}`}
                  value={format}
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
                  onChange={(e) => { setFormatType(e.target.value) }}
                  name='formatType'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.formatType ? isInvalidClass : ''}`}
                  value={formatType}
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
                  onChange={evt => { setNoVariants(evt.target.checked) }}
                  value={noVariants}
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
                  onChange={(e) => { setDateDescriptor(e.target.value) }}
                  name='dateDescriptor'
                  type="text"
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.dateDescriptor ? isInvalidClass : ''}`}
                  value={dateDescriptor}
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
                  onChange={(e) => { setDateRange(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.dateRange ? isInvalidClass : ''}`}
                  name='dateRange'
                  placeholder='Date range'
                  value={dateRange}
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
                  onChange={(e) => { setTitle(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.title ? isInvalidClass : ''}`}
                  name='title'
                  placeholder='Title'
                  value={title}
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
                  onChange={(e) => { setTitleStartsWith(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.titleStartsWith ? isInvalidClass : ''}`}
                  name='titleStartsWith'
                  placeholder='Title starts with...'
                  value={titleStartsWith}
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
                  onChange={(e) => { setStartYear(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.startYear ? isInvalidClass : ''}`}
                  name='startYear'
                  placeholder='Start year'
                  value={startYear}
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
                  onChange={(e) => { setIssueNumber(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.issueNumber ? isInvalidClass : ''}`}
                  name='issueNumber'
                  placeholder='Issue number'
                  value={issueNumber}
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
                  onChange={(e) => { setDiamondCode(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.diamondCode ? isInvalidClass : ''}`}
                  name='diamondCode'
                  placeholder='Diamond code'
                  value={diamondCode}
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
                  onChange={(e) => { setDigitalID(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.digitalId ? isInvalidClass : ''}`}
                  name='digitalId'
                  placeholder='Digital id'
                  value={digitalID}
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
                  onChange={(e) => { setUpc(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.upc ? isInvalidClass : ''}`}
                  name='upc'
                  placeholder='UPC barcode'
                  value={upc}
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
                  onChange={(e) => { setIsbn(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.isbn ? isInvalidClass : ''}`}
                  name='isbn'
                  placeholder='ISBN number'
                  value={isbn}
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
                  onChange={(e) => { setEan(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.ean ? isInvalidClass : ''}`}
                  name='ean'
                  placeholder='EAN number (The International Article Number or European Article Number)'
                  value={ean}
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
                  onChange={(e) => { setIssn(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.issn ? isInvalidClass : ''}`}
                  name='issn'
                  placeholder='ISSN number (International Standard Serial Number)'
                  value={issn}
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
                  onChange={evt => { setHasDigitalIssue(evt.target.checked) }}
                  value={hasDigitalIssue}
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
                  onChange={(e) => { setModifiedSince(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.modifiedSince ? isInvalidClass : ''}`}
                  name='modifiedSince'
                  placeholder='Date modified since'
                  type='date'
                  value={modifiedSince}
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
                  onChange={(e) => { setCreators(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.creators ? isInvalidClass : ''}`}
                  name='creators'
                  placeholder='creators'
                  value={creators}
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
                  onChange={(e) => { setCharacters(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.characters ? isInvalidClass : ''}`}
                  name='characters'
                  placeholder='Characters'
                  value={characters}
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
                  onChange={(e) => { setSeries(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.series ? isInvalidClass : ''}`}
                  name='series'
                  placeholder='Series'
                  value={series}
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
                  onChange={(e) => { setEvents(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.events ? isInvalidClass : ''}`}
                  name='events'
                  placeholder='Events'
                  value={events}
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
                  onChange={(e) => { setStories(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.stories ? isInvalidClass : ''}`}
                  name='stories'
                  placeholder='Stories'
                  value={stories}
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
                  onChange={(e) => { setSharedAppearances(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.sharedAppearances ? isInvalidClass : ''}`}
                  name='sharedAppearances'
                  placeholder='Shared appearances'
                  value={sharedAppearances}
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
                  onChange={(e) => { setCollaborators(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.collaborators ? isInvalidClass : ''}`}
                  name='collaborators'
                  placeholder='Collaborators'
                  value={collaborators}
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
                  onChange={(e) => { setOrderBy(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.orderBy ? isInvalidClass : ''}`}
                  name='orderBy'
                  placeholder='Order by'
                  value={orderBy}
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
                  onChange={(e) => { setLimit(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.limit ? isInvalidClass : ''}`}
                  name='limit'
                  placeholder='Limit'
                  value={limit}
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
                  onChange={(e) => { setOffset(e.target.value) }}
                  style={styles.input}
                  className={`form-control ${searchComicsData && searchComicsData.error && searchComicsData.error.offset ? isInvalidClass : ''}`}
                  name='offset'
                  placeholder='Offset'
                  value={offset}
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
	comicsFilters: state.comicsFilters,
	searchComics: state.searchComics,
})
const mapDispatchToProps = dispatch => ({
	getComicsFilters: (filters, offset) => dispatch(getComicsFilters(offset)),
	getSearchComics: (filters, offset) => dispatch(getSearchComics(filters, offset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchComicsPage)
