import React from 'react'
import { Link } from "react-router-dom"
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
                    onClick={() => { window.location.href = '/' }}
                />
            </div>
            <nav className='container nav-container'>
                <Link className='btn btn-warning btn-lg' to='/'>Home</Link>
                <Link className='btn btn-warning btn-lg' to='/search'>Search</Link>
                <Link className='btn btn-warning btn-lg' to='/favs'>Favourites</Link>
                <Link className='btn btn-warning btn-lg' to='/404'>404 page</Link>
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
