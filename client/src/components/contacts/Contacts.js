import React, {useContext, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner'

export default function Contacts() {

    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading} = contactContext;

    useEffect(()=>{
        getContacts();
        // eslint-disable-next-line
    }, [])

    if(contacts!== null && contacts.length === 0 && !loading){
        return <h4>Please add a contact</h4>
    }

    return (
        <div>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {
                filtered !== null ? 
                filtered.map(contact =>
                    <CSSTransition key={contact.id} timeout={500} classNames="item">
                        <ContactItem  contact={contact}/>
                    </CSSTransition>
                    )
                : contacts.map(contact => {
                    return <CSSTransition key={contact.id} timeout={500} classNames="item">
    
                        <ContactItem key={contact.id} contact={contact}/>
                        </CSSTransition>
                    })
                   
               }
                {/* {contacts.map(contact => {
                    return <ContactItem key={contact.id} contact={contact}/>
                })} */}
                </TransitionGroup>
            ) : <Spinner/>}
            
            
        </div>
    )
}
