import { combineReducers } from "redux"

import searchComicsReducer from "./searchComics"
import comicsFiltersReducer from "./comicsFilters"
import comicsReducer from "./comics"
import singleComicReducer from "./singleComic"
import comicReducer from "./comic"

export default combineReducers({
    comicsFilters: comicsFiltersReducer,
    searchComics: searchComicsReducer,
    singleComic: singleComicReducer,
    comics: comicsReducer,
    comic: comicReducer,
})
