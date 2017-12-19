import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import passages from './passages.json';
// import Form from './Form';
// import Story from './Story';

class Form extends Component {
  render() {
    const { order, handleButton, handleForm, handleInput } = this.props

    return (
      <form onSubmit={handleForm}>
        {order.map((word, index) => (
          <div>
            <input type='text' name='words' id={index} placeholder={word} onChange={handleInput} />
            <p>{word}</p>
          </div>
        ))}
        <div>
          <button onClick={handleButton}>Madfy</button>
        </div>
      </form>
    )
  }
}

class Story extends Component {
  getWord = () => {
    // this function is used ...? 
  }

  // HERE!!!
  // stuck here on rendering the full story with styling tags... 
  makeStory = (passage, words) => {
    // makes a story! 
    // returns a ( <div> </div> ) element 
    // passage: [0] he said [1] as he jumped ... 
    // words: [hello, hastily, ...] 
    // story: '&lt;span className='libbed'&gt;hello$lt;/span&gt;! he said <span className='libbed'>hastily</span> as he jumped...'
    let story = passage 
    let pattern = /\[[^\]]*\]/ 

    for(let i = 0; i < words.length; i++) {
      story = story.replace(pattern, `&lt;span className='libbed'&gt;${words[i]}&lt;/span&gt;`)
    }

    console.log(story) 
    return story
  }

  render() {
    const { passage, wordcount, words } = this.props
    this.makeStory(passage, words)

    return (
      <div>
        <p>Story goes here</p>
        <p>{this.makeStory(passage, words)}</p>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    // this.passages = passages 
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
    // console.log('form submitted')
    this.setState({
      submitted: true
    })
  }

  // when user clicks 'Madify'
  handleButtonClick = event => {
    // console.log('button clicked')
    this.setState({
      submitted: true
    })
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

    // console.log(passages)
    console.log(this.state)

    return (
      <div>
        <h1>Madify</h1>
        <Form order={order}
          handleButton={this.handleButtonClick}
          handleForm={this.handleFormSubmit}
          handleInput={this.handleInputChange} />

        {submitted ? <Story
          passage={passage}
          wordcount={wordsNeeded}
          words={words} /> : ''}

      </div>
    );
  }
}

export default App;
