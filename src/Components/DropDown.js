import React, { useState } from 'react'
import M from 'materialize-css'
import './DropDown.css'
import MdDollar from './MdDollar'
import MdMusic from './MdMusic'
import MdHome from './MdHome'
import GithubIcon from './GithubIcon'
import { Login } from './MdPlay'
import { Link } from 'react-router-dom'
export const DropDown = ({css}) => {
  const [clickShade, setClickShade] = useState(css)
  document.body.style.overflow = clickShade === "changed" ? "hidden" : "scroll"
  return (
    <div className='wrapper'>
    <div className={`${clickShade}`}>
    <div className='shade' onClick={() =>{setClickShade('changed')}}>
        <ul>
            <Link to = 'home' ><li><MdHome/><p>Home</p></li></Link>
            <Link to = 'contribute' ><li><MdMusic/><p>Contribute Tracks</p></li></Link>
            <Link to = 'donate' ><li><MdDollar/><p>Donate</p></li></Link>
            <Link to = 'github' ><li><GithubIcon/><p>Github</p></li></Link>
        </ul>
    </div>
    </div>
    </div>
  )
}
