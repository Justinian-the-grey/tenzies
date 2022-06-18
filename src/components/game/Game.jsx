import './Game.css'
import Die from '../die/Die'
import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'

function Game() {
  // eslint-disable-next-line no-unused-vars
  const [dice, setDice] = useState(getRandomArray)
  const [hasWon, setHasWon] = useState(false)
  const [counter, setCounter] = useState(0)
  const [timer, setTimer] = useState(0)

  const temp = useRef(null)

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

  function startTimer() {
    temp.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  function handleClick() {
    if (hasWon) {
      setHasWon(false)
      setDice(getRandomArray())
      setCounter(0)
      setTimer(0)
      startTimer()
    }

    !hasWon && setCounter((prev) => prev + 1)

    setDice((prevDice) =>
      prevDice.map((die) => {
        let rnd = Math.ceil(Math.random() * 6)
        return die.isHeld ? die : { ...die, isHeld: false, value: rnd }
      })
    )
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)

    if (allHeld && allSameValue) {
      setHasWon(true)
    }
  }, [dice])

  useEffect(() => {
    startTimer()
    return () => clearInterval(temp.current)
  }, [])

  useEffect(() => {
    if (hasWon) {
      clearInterval(temp.current)
      return
    }
  }, [timer])

  return (
    <main className='outer-container'>
      {hasWon && <Confetti />}
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
        {hasWon ? 'Replay' : 'Roll'}
      </button>
      <div className='round-timer'>
        <p>Round: {counter}</p>
        <p>Timer: {timer}</p>
      </div>
    </main>
  )
}

export default Game
