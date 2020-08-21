import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({title, icon}) {
    return (
        <div className="navbar bg-primary">
            <h1><i className="fa fa-id-card-alt"></i>Contact Keeper</h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </div>
    )
}
