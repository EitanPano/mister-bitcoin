import { Component } from 'react'
import { ContactDetails } from '../pages/ContactDetails';
import { ContactPreview } from "./ContactPreview";

export function ContactList({ currContact, goBack, removeContact, contacts }) {

    return (
        currContact ? <section>
            <ContactDetails currContact={currContact} goBack={goBack} />
        </section> :
            <div>
                <section>
                    {contacts.map(contact => <ContactPreview removeContact={removeContact} contact={contact} key={contact._id} />)}
                </section>
            </div>
    )
}








