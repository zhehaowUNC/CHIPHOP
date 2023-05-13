import React from 'react'
import {MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdOutlineLoop, 
  MdOutlineDoubleArrow, MdSend, MdMenu, MdLogin, MdPermIdentity, MdAccountCircle,MdModeComment} from 'react-icons/md'
import {AiOutlineLogout, AiOutlineComment} from 'react-icons/ai'
import {FaRandom} from 'react-icons/fa'
import { BiLogInCircle,BiCommentDots, BiGhost} from 'react-icons/bi'
import {SiStripe} from 'react-icons/si'
import {RiErrorWarningLine} from 'react-icons/ri'
import {IoIosCloudUpload, IoMdTrash} from 'react-icons/io'
import {GiPayMoney} from 'react-icons/gi' 
export const Ghost = () => {
  return (
    <BiGhost style={{ fontSize:'40px', color:'grey',  position:'relative', top:'10px'}}/>
  )
}
export const Logout = () => {
  return (
    <AiOutlineLogout style={{ fontSize:'23px', position:'relative', top:'13px'}}/>
  )
}
export const Trash = () =>{
  return (
    <IoMdTrash style={{fontSize:'15px', position:'absolute', top:'7.5px', right:'7.5px'}}/>
  )
}
export const Stripe = () =>{
  return (
    <SiStripe style={{ fontSize:'23px', position:'relative', top:'1px'}}/>
  )
}
export const Pay = () => {
  return (
    <GiPayMoney style = {{position:'relative',left:'50%',     transform:' translate(-50%, -50%)',    fontSize:'70px'}}/>
  )
}
export const  Comment = () => {
  return (
    <BiCommentDots style={{ position:'relative', top:'0px'}}/>
  )
}

export const  Send = () => {
  return (
    <MdSend style={{ position:'relative', top:'11px'}}/>
  )
}
export const Identity = () => {
  return (
    <MdPermIdentity/>
  )
}
export const AccountRed = () => {
  return (
    <MdAccountCircle style={{color:'red', fontSize:'25px', position:'relative', top:'4px'}}/>
  )
}
export const Account = () => {
  return (
    <MdAccountCircle style={{fontSize:'25px', position:'relative', top:'4px'}}/>
  )
}
export const Upload = () => {
  return (
    <IoIosCloudUpload/>
  )
}
export const Warning = () => {
    return (
      <RiErrorWarningLine/>
    )
  }
  export const Login = () => {
    return (
      <BiLogInCircle style={{color:'#e53935'}}/>
    )
  }
  export const Loginwhite = () => {
    return (
      <BiLogInCircle />
    )
  }
export const Random = () => {
    return (
      <FaRandom/>
    )
  }
export const MdPlayBut = () => {
  return (
    <MdPlayArrow/>
  )
}
export const MdPauseBut = () => {
    return (
      <MdPause/>
    )
  }
  export const MdNextBut = () => {
    return (
      <MdSkipNext/>
    )
  }
  export const MdPrevBut = () => {
    return (
      <MdSkipPrevious/>
    )
  }
  export const MdLoopBut = () => {
    return (
      <MdOutlineLoop/>
    )
  }
  export const MdOrderBut = () => {
    return (
      <MdOutlineDoubleArrow/>
    )
  }
  export const Menu = () => {
    return (
      <MdMenu/>
    )
  }


