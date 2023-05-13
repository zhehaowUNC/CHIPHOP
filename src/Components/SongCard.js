import React from 'react'
import M from 'materialize-css'
import './SongCard.css'
import { useState } from 'react'
export const SongCard = ({artistName, albumCover, songName, albumName, onclick}) => {
    const[Css, setCss] = useState('scard')
  return (
      <div onClick={onclick} id = 'overall'  className={`${Css} waves-effect`} 
      onMouseEnter={() => setCss('scarddamn')} onMouseLeave = {() => setCss('scard')}>
            <div className="cardcontainer">
            <div className="image">
    <img className='albumface circle' src={albumCover}/>
  </div>
<div className='info'>
  <div className="colum">
    <div className='songname'>
      {songName}
    </div>
    <div className='albumname'>
      {`${artistName} - ${albumName}`}
    </div>
  </div>
  </div>

</div>
    </div>
  )
}
