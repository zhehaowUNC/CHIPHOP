import React, { useState, useContext} from 'react'
import './login.css'
import M from 'materialize-css'
import {useSpring,animated} from 'react-spring'
import { Link } from 'react-router-dom'
import { Warning } from './MdPlay'
import { Login, Loginwhite } from './MdPlay'

// import { useSelector, useDispatch } from 'react-redux'
// import { login, logout } from '../redux/actions'
import { AuthContext } from '../AuthContext'
import {Navigate} from 'react-router'
import { Auth } from 'aws-amplify'
import axios from 'axios'
export const LoginPage = () => {
    const { authenticate, logout, getSession, isLoggedIn, changeLoggedIn } = useContext(AuthContext);
    const [opa, setOpa] = useState(0)
    const [sucopa, setSucOpa] = useState(1)
    const [message, setMessage] = useState("")
    // const username = useSelector(state => state.username)
    // const dispatch = useDispatch()

    const animation = useSpring({
        from:{    opacity: 0, 
            },
        to:{opacity: 1}
    })
    const [info, setInfo] = useState({
        username:'',
        password:''
    })
    const [err, serErr] = useState('')
    
    const handleInput = (e) =>{
        setInfo(() => {
            var cur = info
            cur[`${e.target.id}`] = e.target.value
            return cur
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        Auth.signIn(info.username, info.password)
        .then(user => {
          console.log("hello")
          changeLoggedIn()
          // handleDelay()
          // dispatch(login(info.username, info))
          // Perform any additional actions after a successful login, like updating the UI or Redux store
        })
        .catch(error => {
          console.log(error)
          if (error.message.includes("InvalidParameterException") || error.message.includes("Incorrect username")){
          setMessage("Incorrect Email or Password.")
          setOpa(1)}
          else{
            setMessage("Something Unknown Went Wrong :/")
            setOpa(1)
          }
          // Handle any errors that occurred during login, like displaying an error message
        });
    }

if (isLoggedIn){
  return  <Navigate to = '/account'/>
}
    
  return (
      
    <animated.div
    style = {animation}>
      <div className='container'>
          <div className='loginoverall'>
    <div className='login'>
    <h3 style={{textAlign:'center', fontWeight : 'bold'}}>Sign In</h3>
    <p style={{textAlign:'center', marginTop:'30px',marginBottom:'7px'}}>Don't Have an Account? &nbsp;<Link to='/register'>Sign Up</Link></p>
 <div className='warningLogin' style={{opacity:`${opa}`, transition: '0.1s ease-in-out'}}><div className='icon'><Warning/></div>
 <p style={{display:'inline'}} >{message}</p></div> 
    <form onSubmit={handleSubmit}>
    <p style={{marginBottom : '4px'}}>Email</p>
    <input onChange={handleInput}id='username' type={'text'} placeholder = 'Email...' required></input>
      
            <p style={{marginBottom : '4px'}}>Password</p>
            <input onChange={handleInput}id='password' type={'password'} required></input>
            <label>
            <div id = 'submit' className = 'waves-effect waves-light'>
                <Loginwhite/>
            <input  style={{visibility:'hidden'}}   type={'submit'} ></input>
            
            </div>
            </label>
            </form>
    </div>
    </div>

    </div>

    </animated.div>
  )
}
