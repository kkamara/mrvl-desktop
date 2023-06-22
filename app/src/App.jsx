import { BrowserRouter, Switch, Redirect, Route, Routes, Navigate, } from 'react-router-dom'
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
    <BrowserRouter>
      <Fragment>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/comic/:comic' element={<ComicPage/>} />
          <Route path='/search' element={<SearchComicsPage/>} />
          <Route path='/favs' element={<FavouriteComicsPage/>} />
          <Route path='/404' element={<Page404/>} />
          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Routes>
        <Footer />
      </Fragment>
    </BrowserRouter>
  </div>
)

export default App
