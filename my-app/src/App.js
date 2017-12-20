import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import passages from './passages.json';
// import Form from './Form';
// import Story from './Story';

class Form extends Component {
  render() {
    const { order, handleForm, handleInput } = this.props

    return (
      <form onSubmit={handleForm}>
        {order.map((word, index) => (
          <div>
            <input type='text' name='words' id={index} placeholder={word} onChange={handleInput} />
            <p>{word}</p>
          </div>
        ))}
      </form>
    )
  }
}


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

class App extends Component {
  constructor() {
    super()
    this.state = {
      passage: '',
      wordsNeeded: 0,
      order: [],
      words: [],
      story: '',
      submitted: false
    }
  }

  componentDidMount = () => {
    this.getOrder()
  }

  // grabs random passage from the passages file 
  grabRandomPassage = () => {
    let i = Math.floor(Math.random() * passages.length)
    return passages[i]
  }

  // takes passages and extracts: order of words while replacing those words with the order index 
  getOrder = () => {
    let random = this.grabRandomPassage() // grabs random passage object (passages, wordsNeeded)
    let randomPassage = random.passage
    let wordsNeeded = random.wordsNeeded
    let pattern = /<[^>]*>/  // this finds the first instance of <...>   
    let orderArray = []

    for (let i = 0; i < wordsNeeded; i++) {
      let foundWord = randomPassage.match(pattern)[0] // <exclaim> 
      let orderWord = foundWord.split('').splice(1, foundWord.length - 2).join('') // exclaim 
      randomPassage = randomPassage.replace(pattern, `[${i}]`) // $0 she said... 
      orderArray.push(orderWord)
    }

    this.setState({
      passage: randomPassage,
      wordsNeeded: wordsNeeded,
      order: orderArray
    })
  }

  // prevents page reload when form is submitted 
  handleFormSubmit = event => {
    event.preventDefault()
    this.setState({
      submitted: true
    })
  }

  // when user clicks 'Madify'
  handleSubmitButton = event => {
    const { passage, wordsNeeded, order, words, story, submitted } = this.state 

    const hasWords = words.filter(word => word)

    if (hasWords.length === wordsNeeded) {
      this.setState({
        submitted: true
      })
    } else {
      console.log(`only filled out ${hasWords.length} words out of ${wordsNeeded}`)
    }
  }

  // HERE!! 
  // working on randomly choosing another passage 
  // and re-rendering the empty form 
  // when user clicks 'Another one'
  handleAnotherButton = event => {
    // 
  }

  // tracks changes in form text input and adds to state 
  handleInputChange = event => {
    let newWords = this.state.words
    let i = parseInt(event.target.id)
    newWords[i] = event.target.value

    this.setState({
      words: newWords
    })
  }

  render() {
    const { passage, wordsNeeded, order, words, story, submitted } = this.state

    console.log(this.state)

    return (
      <div>
        <h1>Madify</h1>
        <Form order={order}
          handleForm={this.handleFormSubmit}
          handleInput={this.handleInputChange} />

        <div>
          <button onClick={this.handleSubmitButton}>Madify</button>
          <button onClick={this.handleAnotherButton}>Another one</button>

        </div>

        {submitted ? <Story
          passage={passage}
          wordcount={wordsNeeded}
          words={words} /> : ''}

      </div>
    );
  }
}

export default App;
