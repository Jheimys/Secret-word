import { useState, useRef } from 'react'
import './Game.css'

function Game({
  verifyLtter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters,
  wrongLetters,
  guesses,
  score}) {

    const [letter, setLetter] = useState('')
    const letterInputRefer = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()
      
      verifyLtter(letter)

      setLetter('')
      letterInputRefer.current.focus()
    }

  return (
    <div className='game'>
      <p className='points'> 
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters.map((letter, i) => 
          guessedLetters.includes(letter) 
          ? (<span className='letter' key={i}> {letter}  </span>)
          : (<span className='blankSquere' key={i} ></span>)
        )}
        
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            name='letter' 
            maxLength='1'
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            ref={letterInputRefer}
            required 
          />
          <button type='submit'>Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersCo">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>

  )
}

export default Game