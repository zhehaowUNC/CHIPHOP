import React from 'react'
import M from 'materialize-css';
import './Card.css'
import { Link } from 'react-router-dom';
export const Card = ({pic, name, link}) => {
  return (
    <React.Fragment>
        <Link to = {`${link}`}>

    <div className='aCard'>
      <div className='col  waves-effect'>
        <img src={pic}  className="circle responsive-img "/>
                        <p> {name}</p>
                        </div>
                        
    
    </div> 
       </Link>

    </React.Fragment>
  )
}
