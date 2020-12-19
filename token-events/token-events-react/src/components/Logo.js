import React from 'react'
import { Link } from 'react-router-dom'
import tokenLogo from '../images/token-icon.png'


function Logo() {
    return (
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={tokenLogo} width={40} height={40} alt="logo" />
                <div style={{ fontSize: 20, marginLeft: 5 }}>Token Events</div>
            </div>
        </Link>
    )
}

export default Logo