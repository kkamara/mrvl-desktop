import React from 'react'
import { APP_NAME, YEAR_RELEASED, } from '../constants'

import './Footer.scss'

const Footer = () => (
    <footer className='footer'>
        <div className='container text-center footer-text'>
            {APP_NAME} &copy; {YEAR_RELEASED}&nbsp;
            <a target='_blank' href='https://github.com/kkamara/mrvl-web'>
                Github
            </a>
        </div>
    </footer>
)

export default Footer
