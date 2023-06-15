import React, { 
	useState, 
	useEffect, 
	useCallback,
} from "react"
import { connect, } from "react-redux"
import { Helmet, } from "react-helmet"
import ComicService from '../../service/comicService'

import { getComics, } from "../../redux/actions/comics"
import { getFavComics, } from "../../redux/actions/comic"
import SimplePagination from "../Pagination/SimplePagination"
import Comic from '../Comic'

import { useQuery, } from '../../utilities/methods'
import Loader from "../Loader"
import { APP_NAME, } from "../../constants"

import './HomePage.scss'

const comicService = new ComicService

const HomePage = ({ 
	comics, 
	getComics,
	getFavComics,
}) => {
	const query = useQuery()
	let offset = 0

	let queryOffset = query.get('offset')
	if (queryOffset && !isNaN(parseInt(queryOffset))) {
			offset = parseInt(queryOffset)
	}

	const { data, fetched, loading, } = comics
	const pageTitle = `Home | ${APP_NAME}`

	const [isOpenStatesPerComic, setisOpenStatesPerComic] = useState(null)

	useEffect(() => {
		loadComics(offset)
		loadFavComics()
	}, [])

	const loadComics = (offset) => {
		getComics(offset)
	}

	const loadFavComics = () => {
		getFavComics()
	}

	const __renderHeaderTags = () => {
		if (data === false) {
			return <Helmet>
				<title>{pageTitle}</title>
				<meta name="title" content={pageTitle} />
				<meta name="url" content={window.location.href} />
			</Helmet>
		}

		const comic = data.results[11]
		const img = comic.images[0]

		return <Helmet>
			<title>{pageTitle}</title>
			<meta name="title" content={pageTitle} />
			<meta name="url" content={window.location.href} />
			<meta name="description" content={comic.description}/>
			{img ?
				<meta name="image" content={img.path + img.extension} /> :
				null}
		</Helmet>
	}

	const dataHasLoaded = !(!data ||
		!(
			(typeof data === 'object' && data !== null) &&
			data.results !== undefined
		) ||
		!data.results.length)

	const __renderComics = () => {
		if (!dataHasLoaded) {
			return <p>No results to display your query.</p>
		}

		return data.results.map((comic, key) => {
			return <Comic 
				key={key} 
				comic={comic}
				disablePrevPaginator={comicService.shouldDisableLeftPaginator(key, data.results)}
				disableNextPaginator={comicService.shouldDisableRightPaginator(key, data.results)}
				openDefaultValue={isOpenStatesPerComic && isOpenStatesPerComic.length ? isOpenStatesPerComic[key] : false}
				openNextComic={() => { 
					setisOpenStatesPerComic(isOpenStatesPerComic => {
						const isOpenStatesPerComicNew = []
						data.results.forEach((_, k) => {
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
						data.results.forEach((_, k) => {
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
						data.results.forEach((_, k) => {
							isOpenStatesPerComicNew[k] = false
						})
						return isOpenStatesPerComicNew
					})
				}}
			/>
		})
	}

	let content = null

	if (fetched && !loading) {
		content = (
			<div className="container text-center">
				<div className="content-header">
					<SimplePagination data={data} />
				</div>
				{__renderComics()}
				<div className="content-footer">
					<SimplePagination data={data} />
				</div>
			</div>
		)
	} else if (!fetched && loading) {
		content = <Loader />
	} else {
		content = <div className="container">
			<div>Unknown error encountered</div>
		</div>
	}

	return <>
		{__renderHeaderTags()}
		{content}
	</>
}

const mapStateToProps = state => ({
	comics: state.comics,
})
const mapDispatchToProps = dispatch => ({
	getComics: offset => dispatch(getComics(offset)),
	getFavComics: (fetchFavItems) => dispatch(getFavComics(fetchFavItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
