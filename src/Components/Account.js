import React from 'react'
import M from 'materialize-css'
import { useState, useEffect, useRef, useContext } from 'react'
import { useSpring, animated } from 'react-spring'
import { LogOutBut } from './LogoutBut'
import {Auth} from 'aws-amplify'
import { Notification } from './Notification'
import { AuthContext } from '../AuthContext';
import axios from 'axios'
import './Account.css'
import { NewSongCard } from './NewSongCard'
import { getTracks, deleteTrack } from '../s3Utils'
import {MdPlayBut, MdPauseBut, MdLoopBut, MdOrderBut, MdNextBut, MdPrevBut} from './MdPlay.js'
import Color, {Palette} from "color-thief-react"

import { FaRandom } from 'react-icons/fa'

export const AccountPage = () => {
    var number = 1;
const [playtime, setPlayTime] = useState('0:00')
const [color, setColor] = useState("white")
const [SecondColor, setSecondColor] = useState("white")
const [term, setTerm] = useState('')
const [coverColor, setCoverColor] = useState('#555555')
const audioEl = useRef() 
const barEl = useRef(null) 
const [index, setCurIndex] = useState(0)
const [showNotification, setShowNotification] = useState(false);
const [message, setMessage] = useState("")
const [messageColor, setMessageColor] = useState("")
const [mode, setMode] = useState("order")
const [play, setPlay] = useState("pause")
const intervalRef = useRef()
const [cover, setCover] = useState('')
const [Css, setCss] = useState("playerWrapper")
const [progress, setProgress] = useState(0)
const [barWidth, setBarWidth] = useState(0)
const [image, setImage]= useState(undefined)
const [title, setTitle]= useState(undefined)
const [under, setUnder]= useState(undefined)
const [username, setUsername] = useState('')
const [audio, setAudio]= useState(undefined)
const { getSession } = useContext(AuthContext);
const hextoRgb = (hex) =>{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ]
  }

const resBgColor = (rgbArr) =>{
    var color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;
    return color? '#000000': '#ffffff'
}
const clickBar = (e) =>{
    if(audioEl.current.duration){
     audioEl.current.currentTime = ((e.clientX - barEl.current.getClientRects()[0]["x"])/barEl.current.getClientRects()[0]["width"] * audioEl.current.duration)
    }
    setProgress(audioEl.current.currentTime/audioEl.current.duration * barEl.current.clientWidth)
        
}
const handleDeleteClick = async (username, id) =>{

  try {
    await deleteTrack(username, id );

    const tracksList = await getTracks(username);
    console.log(tracksList)

    setUploadHistory(tracksList);
      setMessage("Track Successfully Deleted!")
        setShowNotification(true);
        setMessageColor("#4caf50")

    } catch (error) {
      console.error(error);
      setMessage("Deletion failed :/ Try Later")
        setShowNotification(true);
        setMessageColor("#f44336")
    }
  
}
const handleNotificationDismiss = () => {
  setShowNotification(false);
};

const togglePlay = ()=>{
setPlay(play == "pause" ? "play":"pause")
}

    const [songHistory, setSongHistory] = useState(undefined)
    const [uploadHistory, setUploadHistory] = useState(undefined)
    const [newHistory, setNewHistory] = useState(undefined)

    const animation = useSpring({
        from:{    opacity: 0, 
            },
        to:{opacity: 1}
    })
    const [firstname, setFirstName] = useState(',')
    
useEffect(()=>{
    Auth.currentAuthenticatedUser()
  .then(user => {
    const { attributes } = user;
    setFirstName(", " + attributes.family_name + "!")
  })
  .catch(error => {
    console.error('Error getting user attributes:', error);
  });
    // if(!songHistory){
    //     axios.post('http://localhost:5555/users/getHistory', {"username":username})
    //     .then(result=>{
    //         setSongHistory(result.data.history)
    //     })
    //     .catch(err => console.log(err))
    // }
    // if(!uploadHistory){
    //     axios.post('http://localhost:5555/users/getSubmission', {"username":username})
    //     .then(result=>{
    //         setUploadHistory(result.data.submission)
    //     })
    //     .catch(err => console.log(err))
    // }
    // if(songHistory && uploadHistory){
    //     setNewHistory( uploadHistory.concat(songHistory))
    // }

}, [songHistory,uploadHistory])

useEffect(() =>{
    if ( uploadHistory){if(play === "play"){
        audioEl.current.play()
    
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            if(audioEl.current && barEl.current){
            if(audioEl.current.duration){
            setProgress(audioEl.current.currentTime/audioEl.current.duration * barEl.current.clientWidth)
            }
            setBarWidth(barEl.current.getClientRects()[0]["right"]-barEl.current.getClientRects()[0]["left"])
    
          
            
            var value = Math.floor(audioEl.current.currentTime % 60)
            if (value>= 10){
           setPlayTime(`${Math.floor(audioEl.current.currentTime / 60)}:${value}`)
                }
            else{
            setPlayTime(`${Math.floor(audioEl.current.currentTime / 60)}:0${value}`)
                }
        }}, 100);
        
    }
    else{
        clearInterval(intervalRef.current)
    
    
        audioEl.current.pause()
    }
    }})
useEffect(() => {
        const fetchTracks = async () => {
          try {
            const session = await getSession();
            const username = session.getIdToken().payload['cognito:username'];
            setUsername(username)
            const tracksList = await getTracks(username);
            console.log(tracksList)

            setUploadHistory(tracksList);
          } catch (error) {
            console.error(error);
          }
        };
        fetchTracks();
      }, [getSession]);


  return (
    <animated.div
    style = {animation}>
<div className='introbg'>
    <div className='container'>
<div className='introwrapper'>
    <h3>{`Good ${new Date().getHours()<12 && new Date().getHours() > 6? "Morning": new Date().getHours()<18 && new Date().getHours()>=12? "Afternoon":"Evening" }${firstname}`} </h3>
    <p className='accountText' >View the Tracks You Contributed Here.</p>
    </div>
    </div>
</div>
<div className='container'>
    <div className='historyWrapper'>
    <h4>Uploaded Tracks</h4>
    </div>
    <div className='uploadSongWrapper'>
    { uploadHistory?.map((thing, index)=>{
        
        if (uploadHistory[index].id){
        
        return <NewSongCard 
        onclick = { () =>{
            setAudio (thing.songUrl )
        setImage (thing.coverArtUrl ? thing.coverArtUrl : require('./default.png'))
            setTitle(decodeURIComponent(thing.id.split("%23*%24")[2]))
            setUnder(decodeURIComponent(thing.id.split("%23*%24")[0]) + " - " + decodeURIComponent(thing.id.split("%23*%24")[1]))
                    setCurIndex(index)
                    setPlay("play")
                    setCss('playerWrapperClicked')
        }
                }
                
        
         key={decodeURIComponent(thing.id.split("%23*%24")[0]) + decodeURIComponent(thing.id.split("%23*%24")[1] + decodeURIComponent(thing.id.split("%23*%24")[2]))} 
         handleDelete = {() => {
           handleDeleteClick(username, thing.id )
           handleDeleteClick(username, thing.id )
          }}artistName={decodeURIComponent(thing.id.split("%23*%24")[0])} albumName={decodeURIComponent(thing.id.split("%23*%24")[1])} songName={decodeURIComponent(thing.id.split("%23*%24")[2])} albumCover ={thing.coverArtUrl ? thing.coverArtUrl : require('./default.png')} />
}})}
        </div>
        {showNotification && (
        <Notification
          message={message}
          messageColor = {messageColor}
          duration={3000}
          onDismiss={handleNotificationDismiss}
        />
      )}
    
    <div className='historyWrapper'>
    {/* <h4>Play History <span className='accountText' > &nbsp; (Last 10 Songs)</span></h4> */}
    <div className='historySongWrapper'>
    {/* { songHistory?.map((thing, index)=>{
        
        if (songHistory[index].albumname){
              return <SongCard 
        onclick = { () =>{
            setImage(require(`../tracks/${songHistory[index].artist}/${songHistory[index].albumname}/cover.jpg`))
            setAudio(require('../tracks/' + `${songHistory[index].artist}` + '/'+`${songHistory[index].albumname}/` + 'Tracks/' + `${songHistory[index].songname}.mp3`))
            setTitle(songHistory[index].songname)
            setUnder(songHistory[index].artist + " - " + songHistory[index].albumname)
            setCurIndex(index + uploadHistory?Object.keys(uploadHistory).length:0)
                    setPlay("play")
                    setCss('playerWrapperClicked')
        }
                }
                
        
         key={songHistory[index].songname} artistName={songHistory[index].artist} albumName={songHistory[index].albumname} songName={songHistory[index].songname} albumCover ={require(`../tracks/${songHistory[index].artist}/${songHistory[index].albumname}/cover.jpg`)}
         />
}})} */}

        <LogOutBut/>
        </div>
    </div>

    {(uploadHistory)? <div className= {`${Css} waves-effect`}   >
   <img className = {"albumFace"}src={image}/> 
   <audio src={audio} ref = {audioEl}/>
   <div className='songinfo'>
       <div className='curSong'> {title}</div>
       <div className='curAlbum'>{under}</div>
       </div>
       <Color src={image} crossOrigin="anonymous" format="hex">
        {({ data, loading }) => {
          if (loading) return;
          if (data !== undefined){
          setCoverColor(data)}
          return ;
        }}
      </Color>
       <div className='control'>

           <div className='bar' ref={barEl} style={{height:'6px', background: `${coverColor}`, transition:'background 0.7s ease-in-out'}} onClick = {clickBar}></div>
           <div className='barprogress' style={{height:'6px',background: `black`, width:`${progress}px`  }} onClick = {clickBar}></div>

           <div id='dot'  style={{ position:'relative', top:'8.5px', left: `${progress - 4}px`}}></div>
           <div id='time' style={{top:'9.5px'}}>{playtime}</div>
           <div id='buttons' style={{position:'relative', top: '14px'}}>
               <div id='play' className='waves-effect waves-light' style={{display:"block", marginLeft:"auto", marginRight:"auto",  background:`${coverColor}`, transition:'background 0.7s ease-in-out', color:`${resBgColor(hextoRgb(coverColor))}`}} onClick={togglePlay}>
                   {play === "pause" ? <MdPlayBut/> : <MdPauseBut/>}</div>
               

            </div>
            </div> 
       </div> : undefined}
    </div>
    
    </animated.div>
  )
}
