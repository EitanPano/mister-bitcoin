import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'
import { eventBusService } from '../services/eventBusService'

// Components :
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'


export class ContactPage extends Component {
    state = {
        contacts: null,
        filterBy: '',
    }

    removeEventBus

    async componentDidMount() {
        this.removeEventBus = eventBusService.on('delete', (contactId) => {
            console.log('contact' + ' ' + contactId + ' deleted');
        })
        this.loadContacts()
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    async loadContacts() {
        const { filterBy } = this.state
        const contacts = await contactService.query(filterBy)
        this.setState({ contacts })
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }


    removeContact = async (contactId) => {
        await contactService.remove(contactId)
        this.loadContacts()
    }

    goBack = () => {
        this.setState({ currContact: null })
    }

    render() {
        const { contacts, currContact } = this.state
        return (
            !contacts ? <div>Loading...</div> :
                <div className='container'>
                    <Link to='/contact/edit'>Add Contact</Link>
                    <ContactFilter onChangeFilter={this.onChangeFilter} />
                    <ContactList currContact={currContact} removeContact={this.removeContact} goBack={this.goBack} contacts={contacts} />
                </div>
        )
    }
}
