import './Game.css'
import Die from '../die/Die'
import { useState } from 'react'

function Game() {
  // eslint-disable-next-line no-unused-vars
  const [dice, setDice] = useState(getRandomArray)
  //   const [isHeld, setIsHeld] = useState(false)

  function getRandomArray() {
    let rndArray = Array.from({ length: 10 }, () =>
      Math.ceil(Math.random() * 6)
    )

    let rndObjectArray = rndArray.map((num, index) => {
      return {
        id: index,
        value: num,
        isHeld: false,
      }
    })

    return rndObjectArray
  }

  function checkDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function handleClick() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        let rnd = Math.ceil(Math.random() * 6)
        return die.isHeld ? die : { ...die, isHeld: false, value: rnd }
      })
    )
  }

  return (
    <main className='outer-container'>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className='inner-container'>
        {dice.map((die) => {
          return (
            <Die
              key={die.id}
              id={die.id}
              isHeld={die.isHeld}
              value={die.value}
              check={checkDie}
            />
          )
        })}
      </div>
      <button className='btn-roll' onClick={handleClick}>
        Roll
      </button>
    </main>
  )
}

export default Game
