import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import './Player.css'
import { useState } from 'react'
import {MdPlayBut, MdPauseBut, MdLoopBut, MdOrderBut, MdNextBut, MdPrevBut, Comment} from './MdPlay.js'
import { Random } from './MdPlay.js'
import { FaRandom } from 'react-icons/fa'
import { DropDown } from './DropDown'

const image = require('../albumcover/P.E.I Mixtape Vol.2.jpg')


export const Player = (props) => {
    
    const audioEl = useRef(null) 
    const [isPlaying, setIsPlaying] = useState(false)
    const [mode, setMode] = useState("order")
    const [play, setPlay] = useState("pause")
    var curIndex = props.selectedName
    // console.log(curIndex)

   


    const prev = () =>{
        // console.log("helll")
        curIndex = curIndex - 1 >= 0? curIndex - 1  : props.songList.length -1 
        console.log(curIndex)


    }
    const next = () =>{
        // console.log("helll")
        curIndex = curIndex + 1 < props.songList.length? curIndex + 1  : 0
        console.log(curIndex)


    }
useEffect(() =>{
    if(isPlaying){
        audioEl.current.play()
    }
    else{
        audioEl.current.pause()
    }
})
const togglePlay = ()=>{
    setPlay(play == "pause" ? "play":"pause")
}
const toggleMode = ()=>{
    setMode(mode == "order" ? "loop": mode == "loop"? "random" : "order")

}
// let file = require(songList[curIndex]["path"])
  return (
    
      <>      

    <div className='playerWrapper waves-effect waves-light'>
       <img className = {"playerAlbum"}src={image}/> 

       <audio src= {null} ref={audioEl}></audio>
       <div className='songinfo'>
           <div className='curSong'> {props.selectedName }</div>
           <div className='curAlbum'>P.E.I. Mixtape Vol. 2</div>
           </div>
           <div className='control'>
               <div id='bar'></div>
               <div id='dot'></div>
               <div id='time'>0:00</div>
               <div id='buttons'>
                   <div id='last' className='waves-effect waves-red' onClick={prev} ><MdPrevBut/></div>
                   <div id='play' className='waves-effect waves-light' onClick={togglePlay}>
                       {play === "pause" ? <MdPlayBut/> : <MdPauseBut/>}</div>
                   <div id='next' className='waves-effect waves-red' onClick={next} ><MdNextBut/></div>
                   <div id='playOrder'className='waves-effect waves-red' onClick={toggleMode}>
                   {mode === "order" ? <MdOrderBut/> :mode === "loop"? <MdLoopBut/>: <FaRandom/>}</div>
                   <div>
                   <Comment/></div>

                </div>
                </div> 
           </div>
           </>

  )
}

