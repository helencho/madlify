import React, { Component } from 'react'

class Form extends Component {
    render() {
        const { words, order, handleForm, handleInput } = this.props

        return (
            <form onSubmit={handleForm}>
                {order.map((word, index) => (
                    <div className='single-input-div' key={index}>
                        <input
                            type='text' name='words'
                            id={index} placeholder={word}
                            onChange={handleInput}
                            value={words[index] || ''} />
                    </div>
                ))}
            </form>
        )
    }
}

export default Form