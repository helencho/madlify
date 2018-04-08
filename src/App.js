import React, { Component } from 'react'
import passages from './passages.json'
import Form from './Form'
import Story from './Story'
import colors from './colors'
import definitions from './definitions' 


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

    // Set background color 
    document.body.style.backgroundColor = this.getBackgroundColor();
  }

  // Grab random passages from passage file 
  grabRandomPassage = () => {
    let i = Math.floor(Math.random() * passages.length)
    return passages[i]
  }

  // Grab a new background color from colors file 
  getBackgroundColor = () => {
    let i = Math.floor(Math.random() * 8)
    let color = colors[i]
    return color 
  }

  // Take passage and extract: 
  // (1) Order of words 
  // (2) Replace those words with order index number 
  getOrder = () => {

    // Grab random passage object { passages, wordsNeeded }
    let random = this.grabRandomPassage() 
    let randomPassage = random.passage
    let wordsNeeded = random.wordsNeeded

    // Find the first instance of < ... > 
    let pattern = /<[^>]*>/ 
    let orderArray = []

    for (let i = 0; i < wordsNeeded; i++) {
      let foundWord = randomPassage.match(pattern)[0] // Ex. <exclaim> 
      let orderWord = foundWord.split('').splice(1, foundWord.length - 2).join('') // Ex. exclaim 
      randomPassage = randomPassage.replace(pattern, `[${i}]`) // Ex. $0 she said... 
      orderArray.push(orderWord)
    }

    this.setState({
      passage: randomPassage,
      wordsNeeded: wordsNeeded,
      order: orderArray
    })
  }

  // Prevent page from reloading when using presses "Return" 
  handleFormSubmit = event => {
    event.preventDefault()
    this.setState({
      submitted: true
    })
  }

  // When user clicks Madify button 
  handleSubmitButton = event => {
    const { wordsNeeded, words } = this.state

    const hasWords = words.filter(word => word)

    if (hasWords.length === wordsNeeded) {
      this.setState({
        submitted: true
      })
    } else {
      console.log(`only filled out ${hasWords.length} words out of ${wordsNeeded}`)
    }
  }

  // When user clicks Another One button, re-render an empty form 
  handleAnotherButton = event => {
    this.setState({
      words: [],
      submitted: false
    })
    this.componentDidMount()
  }

  // Track input changes and add to state 
  handleInputChange = event => {
    let newWords = this.state.words
    let i = parseInt(event.target.id)
    newWords[i] = event.target.value

    this.setState({
      words: newWords
    })
  }

  // When use hovers over text inputs, display a definition and example of the part of speech 
  handleMouseOver = event => {
    let speech = event.target.placeholder 
    let examples = definitions[speech].examples 
    console.log(`${speech} example: ${examples}`)
  }

  render() {
    const { passage, order, words, submitted } = this.state

    console.log(this.state)

    return (
      <div className='container'>
        <h1>Madlify</h1>

        {submitted ?
          <div className='main'>
            <div className='main-story'>
              <Story
                passage={passage}
                words={words} />
            </div>
            <div className='button-bottom-div'>
              <button onClick={this.handleAnotherButton}>Another one</button>
            </div>
          </div>
          :
          <div className='main'>
            <div className='button-top-div'>
              <button onClick={this.handleAnotherButton}>Another one</button>
            </div>

            <div className='main-form'>
              <Form
                words={words}
                order={order}
                handleForm={this.handleFormSubmit}
                handleInput={this.handleInputChange}
                handleMouseOver={this.handleMouseOver} />
            </div>

            <div className='button-bottom-div'>
              <button onClick={this.handleSubmitButton}>Madify</button>
            </div>
          </div>}

      </div>
    );
  }
}

export default App;
