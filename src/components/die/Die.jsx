/* eslint-disable react/prop-types */
import './Die.css'
import img1 from '../../assets/die1.png'
import img2 from '../../assets/die2.png'
import img3 from '../../assets/die3.png'
import img4 from '../../assets/die4.png'
import img5 from '../../assets/die5.png'
import img6 from '../../assets/die6.png'

function Die(props) {
  let image
  if (props.value === 1) {
    image = img1
  } else if (props.value === 2) {
    image = img2
  } else if (props.value === 3) {
    image = img3
  } else if (props.value === 4) {
    image = img4
  } else if (props.value === 5) {
    image = img5
  } else if (props.value === 6) {
    image = img6
  }

  return (
    <div
      className='die'
      style={{ backgroundColor: props.isHeld ? '#59E391' : 'antiquewhite' }}
      onClick={() => props.check(props.id)}
    >
      {/* <h1>{props.value}</h1> */}
      <img src={image} alt='the die image' className='die-image' />
    </div>
  )
}

export default Die
