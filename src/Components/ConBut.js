import React from 'react'
import './ConBut.css'
import M from 'materialize-css';
import { Link } from 'react-router-dom';
export const ConBut = () => {
  return (
    <div>
                <Link to = {`../donate`}><div className='text contribute waves-effect waves-light'>DONATE N' CONTACT</div></Link>
    </div>
  )
}
