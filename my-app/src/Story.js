import React, { Component } from 'react'


class Story extends Component {
    capitalize = str => {
        return str.replace(/\w/, letter => letter.toUpperCase())
    }

    // I gave up on adding styling tags to the substituted words 
    makeStory = (passage, words) => {
        let story = passage
        let pattern = /\[[^\]]*\]/

        for (let i = 0; i < words.length; i++) {
            story = story.replace(pattern, words[i])
        }

        return this.capitalize(story)
    }

    render() {
        const { passage, wordcount, words } = this.props
        this.makeStory(passage, words)

        return (
            <div>
                <p>{this.makeStory(passage, words)}</p>
            </div>
        )
    }
}

export default Story 