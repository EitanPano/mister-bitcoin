import { useHistory } from 'react-router-dom';
import { eventBusService } from "../services/eventBusService"


export function ContactPreview({ contact, removeContact }) {

    function onEdit(ev) {
        ev.stopPropagation()
        history.push(`/contact/edit/${contact._id}`)
    }

    function onRemoveContact(ev) {
        ev.stopPropagation()
        removeContact(contact._id)
        eventBusService.emit('delete', contact._id)
    }

    const history = useHistory()
    const imgUrl = `https://robohash.org/${contact.name}?set=set5`;

    return (
        <article className="contact-preview" onClick={() => history.push(`/contact/${contact._id}`)}>
                <img src={imgUrl} alt="" />
                <h3>{contact.name}</h3>
                <button onClick={onEdit}>📝</button>
                <button onClick={onRemoveContact}>❌</button>
        </article>
    );
}
