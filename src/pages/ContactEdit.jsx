import { Component, createRef } from 'react';
import { contactService } from '../services/contactService';

export class ContactEdit extends Component {
    state = {
        contact: null,
    };

    inputRef = createRef();

    async componentDidMount() {
        const contactId = this.props.match.params.id;
        const contact = contactId
            ? await contactService.getById(contactId)
            : contactService.getEmptyContact();
        this.setState({ contact });
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState((prevState) => ({contact: { ...prevState.contact, [field]: value },})
        );
    };

    onSaveContact = async (ev) => {
        ev.preventDefault();
        await contactService.save({ ...this.state.contact });
        this.props.history.push('/contact');
    };

    render() {
        const { contact } = this.state;
        if (!contact) return <div>Loading...</div>;
        return (
            <section>
                <form action="" onSubmit={this.onSaveContact}>
                    <label htmlFor="contactName">Name:</label>
                    <input
                        autoFocus
                        id="contactName"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={contact.name}
                    />
                    <label htmlFor="contactPhone">Phone:</label>
                    <input
                        id="contactPhone"
                        type="text"
                        name="phone"
                        value={contact.phone}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="contactEmail">Email:</label>
                    <input
                        id="contactEmail"
                        type="text"
                        name="email"
                        value={contact.email}
                        onChange={this.handleChange}
                    />

                    <button>Save</button>
                </form>
            </section>
        );
    }
}
