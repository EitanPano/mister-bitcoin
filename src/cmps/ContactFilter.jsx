import { Component } from 'react'

export class ContactFilter extends Component {
    state={
        term:''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter(this.state)
        })

    }

    render() {
        const { term  } = this.state
        return (
            <div className='contact-filter'>
                <form >
                <section className='input-container'>
                    <label htmlFor="term"><span className="material-icons">search</span></label>
                    <input onChange={this.handleChange} value={term} type="text" name="term" id="term" placeholder='Search' />
                </section>
                </form>
            </div>
        )
    }
}
