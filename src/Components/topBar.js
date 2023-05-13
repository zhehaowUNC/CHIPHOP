import ReactDOM  from 'react-dom';

import  './TopBar.css'
import { DropDown } from './DropDown';
import { Menu } from './MdPlay';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import React, { useState, useContext } from 'react'
import M from 'materialize-css'
import './DropDown.css'
import MdDollar from './MdDollar'
import MdMusic from './MdMusic'
import MdHome from './MdHome'
import GithubIcon from './GithubIcon'
import { Login, Loginwhite, Account, AccountRed } from './MdPlay';
import { AuthContext } from '../AuthContext'

// import { useSelector } from 'react-redux';
export const TopBar = () => {
    const { authenticate, logout, getSession, isLoggedIn } = useContext(AuthContext);

    // var isLoggedIn = useSelector(state=> state.isLoggedIn)
    // var isLoggedIn = true
    const [style, setStyle] = useState("drop")

    document.body.style.overflow = style === "changed" ? "hidden" : "scroll"

    const change = () =>{
        setStyle(style === "drop" ? "changed" : "drop")
    }
    // const change = () =>{
    //     let element = document.getElementsByTagName('DropDown')
    //     ReactDOM.findDOMNode(element).style.visibility = 'visible'
    //     console.log(element)
    // }
    return ( 
        <React.Fragment>
    <div className='topMenu'>
        <div className='container'>
            
        <ul>
        <a href = '#'><div className='circle waves-effect waves-light material-icons' onClick={change}> <MdMenu style={{fontSize:'24px', position:'relative', top:'2px'}}/></div></a>
        <div className='options'>
            <Link to ='/home' className='op'><div className='waves-effect waves-light'>Home</div></Link>
            <Link to ={`${isLoggedIn?'../contribute':'../login'}`} className='op'><div className='waves-effect waves-light'>Contribute Tracks</div></Link>            
            <Link to ='/donate' className='op'><div className='waves-effect waves-light'>Donate n' Contact</div></Link>           
            <Link to ={`${isLoggedIn? 'account' : 'login'}`} className='op'><div className='waves-effect waves-light'>{isLoggedIn? `ACCOUNT` :`LOGIN`}<div style={{ position:'relative', top:'2px'}}>{isLoggedIn? <Account/> : <Loginwhite />}</div></div></Link>

            </div>

        </ul>

        </div>
        </div>
        
  
    <div className='wrapper'>
    <div className={`${style}`}>
    <div className='shade' onClick={() =>{setStyle('drop')}}>
        <ul>
            <Link to = 'home' ><li><MdHome/><p>Home</p></li></Link>
            <Link to = {`${isLoggedIn?'../contribute':'../login'}`} ><li><MdMusic/><p>Contribute Tracks</p></li></Link>
            <Link to = 'donate' ><li><MdDollar/><p>Donate n' Contact</p></li></Link>
            <Link to = {`${isLoggedIn? 'account' : 'login'}`}  ><li>{isLoggedIn? <AccountRed/>: <Login/>}<p>{isLoggedIn? `ACCOUNT`:`LOGIN`}</p></li></Link>
        </ul>
    </div>
    </div>
    </div>
  


        </React.Fragment>
    )
}