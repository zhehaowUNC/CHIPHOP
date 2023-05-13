import React from 'react'
import './submit.css'
import Color from 'color-thief-react'
import M from 'materialize-css'
import { useState } from 'react'
import { Upload, Warning } from './MdPlay'
import {useSpring, animated} from 'react-spring'

const defaultCover = require( '../pics/demo.png')
export const Submit2 = () => {
const [css, setCss] = useState('')
const [vis1, setvis1] = useState(0)
const [vis2, setvis2] = useState(0)
const [shade, setShade ] = useState('rgba(0,0,0,0.3)')
const [image, setImage] = useState(defaultCover)
const [info, setInfo] = useState({
    albumCover:'',
    songFile:'',
    songName:'',
    artist:'',
    albumName:''
})

const handleInput = (e) =>{
    setInfo(() => {
        var cur = info
        cur[`${e.target.id}`] = e.target.value
        return cur
    })
    console.log(info)
}
const handleCover = (e) =>{
    if(e.target.files[0]){
    if (e.target.files[0].type.match('image.*')){
        console.log(e.target.files[0])
        setvis1(0)
        setImage(URL.createObjectURL(e.target.files[0]))
        handleInput(e)
    }
    else{
        setvis1(1)
    }
}
}
const handleSong = (e) =>{
    if(e.target.files[0]){
    if (e.target.files[0].type.match('audio.*')){
        console.log(e.target.files[0])
        setvis2(0)
        setImage(URL.createObjectURL(e.target.files[0]))
        handleInput(e)

    }
    else{
        setvis2(1)
    }
}
}
const animation = useSpring({
    from:{    opacity: 0, 
        },
    to:{opacity: 1},
   
  })
  return (
      <>
      <animated.div style={animation}>
      <Color src={image} crossOrigin="anonymous" format="hex">
        {({ data, loading }) => {
            if(image!==defaultCover){
      if (loading) return;
      setShade(data)
      return ;
        }}
    }
        </Color>
      <div className='submit'>  
      
      <form>
    <div className='coverSubmit'>
        <label >
        <input onChange={handleCover} id='albumCover' type={'file'} style = {{visibility:'hidden'}}></input>
        <div style={{    boxShadow: `0px 0px 30px 5px ${shade}`
}} onMouseLeave ={() =>{
            setCss('')
            
        }} onMouseEnter = {() =>{
            setCss('hover')
        }}  className= {`waves-effect ${css}`}>
        <img src={image} />
      
        
        </div>
        </label>
        <div className='warning' style={{ position:'relative', left:'90px', top:'15px'}} > <p style={{ display:'inline', color:'#f44336', fontSize:'20px'}}> 03:00</p></div>
        {/* <div className='warning2' style={{opacity:`${vis2}`, transition: '0.3s ease-in-out'}}><div className='icon'><Warning/></div> <p style={{display:'inline',  color:'#f44336'}} >Please select as song file audio files.</p></div> */}
 
    </div>
    <div className='container' style={{marginTop : '130px'}}>
        <div className='fileWrapper'>

            <p style={{textAlign:'center', fontSize:'20px'}}>What did you see in this graph?</p>
            <textarea className='materialize-textarea' onChange={handleInput}id='songName' type={'text'} placeholder = 'Type your answer here...' required></textarea>

        </div>
        </div>
        </form>

    </div>
    </animated.div>
    </>
    
  )
}
