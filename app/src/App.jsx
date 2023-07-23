import { HashRouter, Switch, Redirect, Route, } from 'react-router-dom'
import React, { Fragment, lazy, Suspense, } from 'react'

import $ from'jquery'
import Popper from'popper.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

import Header from './components/Header'
import Loader from "./components/Loader"

import FavouriteComicsPage from './components/FavouriteComics/FavouriteComicsPage'
import HomePage from './components/Comics/HomePage'
import ComicPage from './components/Comics/ComicPage'
import SearchComicsPage from './components/Comics/SearchComicsPage'
import Page404 from './components/Page404'
import Footer from './components/Footer'

import './App.scss'

const App = () => (
  <div id='app'>
    <HashRouter>
      <Fragment>
        <Header />
        <Route exact path='/'><HomePage/></Route>
        <Route path='/comic/:comic'><ComicPage/></Route>
        <Route path='/search'><SearchComicsPage/></Route>
        <Route path='/favs'><FavouriteComicsPage/></Route>
        <Route path='/404'><Page404/></Route>
        <Route path="/*"><Redirect to="/404" /></Route>
        <Footer />
      </Fragment>
    </HashRouter>
  </div>
)

export default App
