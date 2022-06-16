/* eslint-disable react/prop-types */
import './Die.css'

function Die(props) {
  return (
    <div
      className='die'
      style={{ backgroundColor: props.isHeld ? '#59E391' : 'antiquewhite' }}
      onClick={() => props.check(props.id)}
    >
      <h1>{props.value}</h1>
    </div>
  )
}

export default Die
