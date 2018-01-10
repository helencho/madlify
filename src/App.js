import React, { Component } from 'react'
import passages from './passages.json'
import Form from './Form'
import Story from './Story'

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

  // re-render an empty form when user clicks "another one" 
  handleAnotherButton = event => {
    this.setState({
      words: [],
      submitted: false
    })
    this.componentDidMount()
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
      <div className='container'>
        <h1>Madify</h1>

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
                handleInput={this.handleInputChange} />
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
