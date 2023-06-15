import React from 'react'
import { Helmet, } from "react-helmet"

import image from '../assets/marvel-moving.gif'
import './Header.scss'

const Header = () => {
	const __renderHeaderTags = () => {
		return <Helmet>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		</Helmet>
	}

    return <>
        {__renderHeaderTags()}
        <header className='header' style={styles.header}>
            <div className='container text-left'>
                <img 
                    className='header-img'
                    src={image} 
                    alt='marvel-moving.gif' 
                    onClick={() => { window.location.href = '/mrvl' }}
                />
            </div>
            <nav className='container nav-container'>
                <a className='btn btn-warning btn-lg' href='/mrvl'>Home</a>
                <a className='btn btn-warning btn-lg' href='/mrvl/search'>Search</a>
                <a className='btn btn-warning btn-lg' href='/mrvl/favs'>Favourites</a>
                <a className='btn btn-warning btn-lg' href='/mrvl/404'>404 page</a>
            </nav>
        </header>
    </>
}

const styles = {
    header: {
        marginTop: 30,
        marginBottom: 70,
    }
}

export default Header
