import React from 'react';
import '../StyleSheet/HomePage.css';
import Bag from '../Images/BAg.png'

export default function HomePage() {
  return (
    <div className='center-container'>
    <div className='FirstPage'>
       <div className='Bag'>
            <img src={Bag} alt='Bag' ></img>
       </div>
       <h1 style={{'fontSize':'40px','margin':'10px'}}>Shoppe</h1>
       <p style={{'textAlign':'center','margin':'10px'}}>Welcome to Shoppe</p>
       <button id='StartButton' onClick={()=>{window.location.href = '/login'}}>Lets get Started</button>
    </div>

    </div>
  )
}
