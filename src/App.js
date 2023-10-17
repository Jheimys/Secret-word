import { useCallback, useEffect, useState } from 'react';
import './App.css'
import StartScreen from './components/StartScreen';
import Game from './components/Game'
import GameOver from './components/GameOver';

import {wordsList} from './data/word'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id:3 , name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const[wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const PickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    
    
    console.log(category)
    console.log(word)

    return {word, category}
  }, [words])


  const startGame = useCallback(() => {
    clearLetterStates()

    const {word, category} =  PickWordAndCategory()
    
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log( word, category)
    console.log(wordLetters)

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [PickWordAndCategory])

  const verifyLtter = (letter) => {
    const nomrmalizedLetter = letter.toLowerCase()

    if(
      guessedLetters.includes(nomrmalizedLetter) || 
      wrongLetters.includes(nomrmalizedLetter)
    ){
      return
    }

    if(letters.includes(nomrmalizedLetter)){
      setGuessedLetters((actual) => [...actual, nomrmalizedLetter ])
    } else {
      setWrongLetters((actual) => [...actual, nomrmalizedLetter])
      setGuesses((actualGuesses) => actualGuesses - 1 )
    }
    
  }
  
  console.log(`guessedLetters: ${guessedLetters}`)
  console.log(wrongLetters)

  function clearLetterStates(){
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0){

      clearLetterStates()
      setGameStage(stages[2].name)
    }
  },[guesses])

  useEffect(() => {
    const uniqueletters = [...new Set(letters)]

    if(guessedLetters.length === uniqueletters.length){
      setScore((actualScore) => (actualScore += 100))
      startGame()
    }
    
  }, [guessedLetters, letters, startGame])
  
  const retry  = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}

      {gameStage === 'game' && <Game 
        verifyLtter={verifyLtter}
        pickedWord = {pickedWord}
        pickedCategory = {pickedCategory} 
        letters = {letters}
        guessedLetters = {guessedLetters}
        wrongLetters = {wrongLetters}
        guesses = {guesses}
        score = {score}

      />}

      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
