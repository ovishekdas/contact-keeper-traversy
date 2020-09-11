import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

export default function Navbar({ title, icon }) {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const {clearContacts} = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }
    const authLinks = (
        <>
            <li>hello {user && user.name}</li>
            <li>
                <a
                    onClick={onLogout}
                    href="#!">
                    <i className="fas fa-sign-out-alt">
                    </i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    )

    const guestsLinks = (
        <>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </>
    )

    console.log('rtedereing')
    const func = (e) => {
        console.log('dragging...');
    }

    const onDragStart = (event, taskName) => {
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }

    const drop = (e) => {
        let taskName = e.dataTransfer.getData("taskName");
        console.log('dropped', taskName)
    }

    const allowDrop = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="navbar bg-primary"
                draggable
                onDrag={func}
                onDragStart={(event) => onDragStart(event, 5)}
            >
                <h1><i className="fa fa-id-card-alt"></i>Contact Keeper</h1>
                <ul>
                    {isAuthenticated ? authLinks : guestsLinks}
                </ul>
            </div>

            <div
                onDrop={drop}
                onDragOver={allowDrop}
                style={{ height: 200, border: "2px solid red" }}

            >

            </div>
        </>
    )
}
