import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../resource/zscaler-logo.svg';
import './header.css'

const Header: React.FC = () => {

    return <div className='container-fluid row align-items-center header-container'>
        <div className='col-4 header-title'><img src={logo} width={200} height={60} /></div>
        <div className='col-8 d-flex justify-content-end'>
            <Link className='header-link' to='table'>
                Table
            </Link>
            <Link className='header-link' to='graph'>
                Graph
            </Link>
        </div>
    </div>
}

export default Header;