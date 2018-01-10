import React, { Component } from 'react'


class Story extends Component {
    capitalize = str => {
        return str.replace(/\w/, letter => letter.toUpperCase())
    }

    // replaces blanks in passages with the words user input 
    makeStory = (passage, words) => {
        let story = passage
        let pattern = /\[[^\]]*\]/ // finds the first instance of [...]

        for (let i = 0; i < words.length; i++) {
            story = story.replace(pattern, words[i])
        }

        return this.capitalize(story)
    }

    render() {
        const { passage, words } = this.props
        this.makeStory(passage, words)

        return (
            <p>{this.makeStory(passage, words)}</p>
        )
    }
}

export default Story 