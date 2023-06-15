import React, { useEffect, useState, } from "react"
import { connect, } from "react-redux"
import { Helmet, } from "react-helmet"
import ComicService from '../../service/comicService'

import { getFavComics, } from "../../redux/actions/comic"
import Comic from '../Comic'

import Loader from "../Loader"
import { APP_NAME, } from "../../constants"

const comicService = new ComicService

const FavouriteComicsPage = ({ getFavComics, comic, }) => {
	const { favComics, fetched, loading, } = comic
	const pageTitle = `Favourite Comics | ${APP_NAME}`

	const [isOpenStatesPerComic, setisOpenStatesPerComic] = useState(null)

	useEffect(() => {
		loadFavComics(true)
	}, [])

	const loadFavComics = (fetchFavItems) => {
		getFavComics(fetchFavItems)
	}

	const __renderHeaderTags = () => {
		return <Helmet>
			<title>{pageTitle}</title>
		</Helmet>
	}
	
	const __renderFavComics = () => {
		if (!favComics.ids.length || !favComics.items.length) {
			return <p>No results to display your query.</p>
		}
		
		return favComics.items.map((favComic, key) =>
			<Comic 
				key={key} 
				comic={favComic} 
				fetchFavItems={true} 
				unFavComicCallback={loadFavComics} 
				disablePrevPaginator={comicService.shouldDisableLeftPaginator(key, favComics.items)}
				disableNextPaginator={comicService.shouldDisableRightPaginator(key, favComics.items)}
				openDefaultValue={isOpenStatesPerComic && isOpenStatesPerComic.length ? isOpenStatesPerComic[key] : false}
				openNextComic={() => { 
					setisOpenStatesPerComic(isOpenStatesPerComic => {
						const isOpenStatesPerComicNew = []
						favComics.items.forEach((_, k) => {
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
						favComics.items.forEach((_, k) => {
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
						favComics.items.forEach((_, k) => {
							isOpenStatesPerComicNew[k] = false
						})
						return isOpenStatesPerComicNew
					})
				}}
			/>
		)
	}
	
	let content = null
	
	if (fetched && !loading) {
		content = (
			<div className="container text-center">
				{__renderFavComics()}
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
  comic: state.comic,
})
const mapDispatchToProps = dispatch => ({
	getFavComics: (fetchFavItems) => dispatch(getFavComics(fetchFavItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteComicsPage)
