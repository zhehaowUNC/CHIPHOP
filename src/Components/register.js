import React from 'react'
import './login.css'
import M from 'materialize-css'
import { useState } from 'react'
import {useSpring,animated} from 'react-spring'
import { Link, useNavigate } from 'react-router-dom'
import { MdPermIdentity } from 'react-icons/md'
import { Warning } from './MdPlay'
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from '../redux/actions'
import { Auth } from 'aws-amplify';

import axios from 'axios'
export const RegisterPage = () => {
    const history = useNavigate();
    // const username = useSelector(state => state.username)
    // const dispatch = useDispatch()
    const [opa, setOpa] = useState(0)
    const [sucopa, setSucOpa] = useState(0)
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState()
    const [color, setColor] = useState('#d32f2f')
    const shouldRedirect = true
    const animation = useSpring({
        from:{    opacity: 0, 
            },
        to:{opacity: 1}
    })
    const [info, setInfo] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        code:''
    })
    
    const handleInput = (e) =>{
        
        if (e.target.id == "username"){
        setOpa(0)
        }
        setInfo(() => {
            var cur = info
            cur[`${e.target.id}`] = e.target.value
            return cur
        })
    }
    // const handleSubmit = async (e) =>{
    //     e.preventDefault()
    //     axios.post('http://localhost:5555/users/signup', info)
    //     .then(res =>{
    //         console.log(res)
    //         setSucOpa(1)
    //         axios.post('http://localhost:5555/users/login', info)
    //         .then(res => {
    //             dispatch(login(info.username))
    //             alert("You Have Successfully Signed Up!")
    //         })
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //         setOpa(1)

    //     })

    // }
     const handleVerify = (e) =>{
        Auth.confirmSignUp(info.email, info.code)
    .then(() => {
      setMessage('Verification Success! Welcome to the Community.')
      setColor('#388e3c')
      // Redirect to another page or show success message
    })
    .catch(error => {
        console.log(error)
        setMessage('Verification Code Is Not Correct.')
        setColor('#d32f2f')
      // Handle the error, show error message to user
    });
     }
     const handleResend = (e) =>{
     Auth.resendSignUp(info.email).then(() =>
     {setMessage('Verfication Code Resent!')
     setColor('#388e3c')})
     .catch ((error) => {
            setMessage('Error Occurred When Resending Code :/')
            setColor('#d32f2f')
          })
     }
     const handleSubmit = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
         if (info.firstName === '' || info.email === '' || info.password === ''){
            setOpa(1)
            setMessage("Fields Other Than Last Name Cannot Be Empty.")
            return
         }
         else if (!emailRegex.test(info.email)){
            setOpa(1)
            setMessage("Email is not in the Right Format.")
            return
         }
         else if (!passRegex.test(info.password)){
            setOpa(1)
            setMessage("Password is not in the Right Format.")
            return
         }
            
          
         
        e.preventDefault()
    Auth.signUp(
        {attributes: {
            family_name: info.firstName, // Make sure to pass the 'family_name' attribute here
          },
            username:info.email,
        password:info.password,
        
        })
    .then((userCredential) => {
        // Sign up successful, redirect to another page.
        setOpa(1)
        setColor('#388e3c')
            setMessage("You Have Successfully Signed Up! Check Your Email for Verification Code.")
            setSuccessful(true)
        // history.push('/home');
      })
      .catch((error) => {
          console.log(error.message)
        // Sign up failed, display error message.
        if (error.message.includes('An account with the given email already exists.')){
            setOpa(1)
            setMessage("An Account with the Given Email Already Exists.")
        }
        else{
            setOpa(1)
            setMessage("Something Unknown Went Wrong :/ Try Again Later")

        }
        
      });
  };
    // const loggedIn = useSelector(state => state.loggedIn)
//     const handleDelay =  () =>{
//         return loggedIn && <Navigate to = '../home' replace ={true}/>
        
// }
  return (
    <animated.div
    style = {animation}>
      <div className='container'>
          
          <div className='loginoverall'>
    <div className='login'>
    <h3 style={{textAlign:'center', fontWeight : 'bold'}}>Sign Up</h3>
    <p style={{textAlign:'center', marginTop:'10px',marginBottom:'40px'}}>Already Have an Account? &nbsp;<Link to='/login'>Sign In</Link></p>
    {opa == 1 ? <div className='warningLogin' style={{color: `${color}`, marginTop:'-20px', opacity:`${opa}`, transition: 'opacity 0.1s ease-in-out'}}><div className='icon'><Warning/></div>
 <p style={{display:'inline'}} >{message}</p></div> : null}

    {!successful ? <form>
        <div className='half'>
    <p style={{marginBottom : '4px'}}>User Name</p>
    <input onChange={handleInput}id='firstName' type={'text'} placeholder = 'User Name...' required></input>
    </div>
    <div className='half' style={{float:"right"}}>
    <p style={{marginBottom : '4px'}}>Last Name (Optional)</p>
    <input onChange={handleInput}id='lastName' type={'text'} placeholder = 'Last Name...' ></input>
    </div>
    <p style={{marginBottom : '4px'}}>Email</p>
    <input onChange={handleInput}id='email' type={'text'} placeholder = 'Your Email...' required></input>
      
            <p style={{marginBottom : '4px'}}>Password (At Least 8 Characters and No Special Characters, Must Contain At Least 1 Number, 1 Uppercase and 1 Lowercase Letter)</p>
            <input onChange={handleInput}id='password' type={'password'} required></input>
            <label>
            <div id = 'submit' className = 'waves-effect waves-light' onClick={handleSubmit} >
                <MdPermIdentity/>
            
            </div>
            </label>
            {/* <input  style={{visibility:'hidden'}} type = 'submit'   ></input> */}

            </form> : <>
            
            <p style={{marginBottom : '4px'}}>Email</p>

<input onChange={handleInput}id='firstName' value = {`${info.email}`} type={'text'} placeholder = 'Email' required></input>
                <p style={{marginBottom : '4px'}}>Verification Code <span style={{color:'#1282D6', cursor: 'pointer'}} onClick = {handleResend}>&nbsp;  Resend</span></p>

            <input onChange={handleInput}id='code' type={'text'} placeholder = 'Verification Code...' required></input>
            <label>
            <div id = 'submit' className = 'waves-effect waves-light' onClick={handleVerify} >
                <MdPermIdentity/>
            
            </div>
            </label>
            </>}
    </div>
    </div>
    </div>
    </animated.div>
  )
}

