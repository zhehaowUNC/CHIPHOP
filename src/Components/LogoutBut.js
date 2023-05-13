import React,{useContext} from 'react'
import './ConBut.css'
import M from 'materialize-css';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { Logout } from './MdPlay'
// import {  logout } from '../redux/actions'
import { AuthContext } from '../AuthContext'

import axios from 'axios';

export const LogOutBut = () => {
  const { authenticate, logout, getSession, isLoggedIn } = useContext(AuthContext);

    // const dispatch = useDispatch()
  // const loggedIn = useSelector(state => state.loggedIn)
  const handleOut = () =>{
    logout()
  }

  return (
    <div onClick={handleOut}>
    <div style={{ display:'block',marginRight:'auto', marginLeft:'auto', backgroundColor:'#e53935 ', width:'70px', height:'70px',borderRadius:'50%'}} className='text contribute waves-effect waves-light'><Logout/></div>
    </div>
  )
}
