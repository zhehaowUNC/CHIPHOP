import React, { useContext } from 'react'
import M from 'materialize-css'
import Color, { Palette } from "color-thief-react"
import './songs.css'
import { useState, useRef, useEffect } from 'react'
import { SongCard } from './SongCard'
import { ScrollableBox } from './ScrollableBox'
import { MdPlayBut, Send, MdPauseBut, MdLoopBut, MdOrderBut, MdNextBut, MdPrevBut, Comment } from './MdPlay.js'
import { useParams } from 'react-router-dom'
import { FaRandom } from 'react-icons/fa'
import { useSpring, animated } from 'react-spring'
import { Background } from './Background'
import UserComment from './UserComment'
import { Ghost } from './MdPlay.js'
import { songPaths } from '../songPaths.js'
import { Auth } from 'aws-amplify'
import { getPresignedUrl, listDir, getAccessToken } from '../s3Utils';
import axios from 'axios'
import './ScrollableBox.css';
import { AuthContext } from '../AuthContext'

import { Notification } from './Notification'
// import { useSelector } from 'react-redux'
export const Songs = () => {
        const { isLoggedIn } = useContext(AuthContext);

        const [songcomment, setSongComment] = useState('');
        const [showNotification, setShowNotification] = useState(false);

        const handleNotificationDismiss = () => {
            setShowNotification(false);
        };


        function handleChange(event) {
            setSongComment(event.target.value);
        }
        async function getFamilyName() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const attributes = await Auth.userAttributes(user);
                const familyNameAttribute = attributes.find(attr => attr.Name === 'family_name');
                const familyName = familyNameAttribute.Value;
                setFamilyName(familyName);
                setUsercheck(user.username)
            } catch (error) {
                console.error('Error fetching family name:', error);
                return null;
            }
        }

        async function handleDelete(commentId) {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                console.error('Unable to get access token');
                return;
            }
            console.log(accessToken)
            console.log(commentId)

            return fetch(
                    `https://ff6vi48i68.execute-api.us-east-1.amazonaws.com/default/deletecomment?commentId=${encodeSpecialCharacters(commentId)}&trackId=${encodeSpecialCharacters(`${name} - ${songList[curIndex].songName}`)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        }
      )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      console.log('Comment deleted:', result);
      setMessage("Comment Deleted")
        setShowNotification(true);
        setMessageColor("#4caf50")
      comment()
      document.body.style.overflow = document.body.style.overflow == "hidden" ? "scroll" : "hidden"

    })
    .catch((error) => {
      setMessage("Deletion failed :/ Try later")
        setShowNotification(true);
        setMessageColor("#f44336")
      console.error('Error deleting comment:', error);
    });
    
      
  }
    
    async function handleSubmit(event){
        event.preventDefault();
        const accessToken = await getAccessToken();
        if (!accessToken) {
          console.error('Unable to get access token');
          return;
        }
      
        const apiUrl = 'https://nehvvovmw2.execute-api.us-east-1.amazonaws.com/default/songcomments';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
      
        Auth.currentAuthenticatedUser()
    .then((user) => {
      const commentData = {
        commentId: `${user.username}-${Date.now()}`,
        trackId: `${name} - ${songList[curIndex].songName}`,
        username: familyName,
        usercheck: user.username,
        timestamp: Date.now(),
        comment: songcomment,
      };
      console.log(commentData)
      axios.post(apiUrl, commentData, { headers: headers })
      .then((response) => {
        setMessage("Comment Sent!")
        setShowNotification(true);
        setMessageColor("#4caf50")
        setSongComment('')
        comment()
        document.body.style.overflow = document.body.style.overflow == "hidden" ? "scroll" : "hidden"
        // Update your UI with the new comment, if needed
      })
      .catch((error) => {
        setMessage("Comment failed :/ Try later")
       
        setMessageColor("#f44336")

        setShowNotification(true);
        console.error('Error submitting comment:', error);
      });    })
    .catch((error) => {
      console.error('Error getting user: ', error);
    });
      
        
    }
let {name} = useParams();
var songList = []
var number = 1;
const [playtime, setPlayTime] = useState('0:00')
const [isVisible, setIsVisible] = useState(false);
const [image, setImageURL] = useState(null)
const [path, setPath] = useState(null)
const [color, setColor] = useState("#ffffff")
const [SecondColor, setSecondColor] = useState("#ffffff")
const [term, setTerm] = useState('')
const [coverColor, setCoverColor] = useState('#ffffff')
const [curIndex, setCurIndex] = useState(0)    
const audioEl = useRef(null) 
const barEl = useRef(null) 
const [message, setMessage] = useState("")
const [messageColor, setMessageColor] = useState("")
const [commentFeed, setCommentFeed] = useState(null)
const [mode, setMode] = useState("order")
const [play, setPlay] = useState("pause")
const intervalRef = useRef()
const [cover, setCover] = useState('')
const [Css, setCss] = useState("playerWrapper")
const [Css2, setCss2] = useState("referenceBox")
const [Css3, setCss3] = useState("hidden")


const [progress, setProgress] = useState(0)
const [barWidth, setBarWidth] = useState(0)
const [familyName, setFamilyName] = useState(null);
const [usercheck, setUsercheck] = useState(null);

// const loggedIn = useSelector(state =>state.loggedIn)
// const username = useSelector(state =>state.username)
const hextoRgb = (hex) =>{

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
 
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [255,255,255]
  }
const resBgColor = (rgbArr) =>{
    var color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;
    return color? '#000000': '#ffffff'
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
function getSongsWithPresignedUrls(songs) {
    const songsWithUrls = [];
  
    return Promise.all(songs.map((song,index) => {
      return getPresignedUrl('chiphoptracks', song.cover)
        .then(coverUrl => {
          return getPresignedUrl('chiphoptracks', song.path)
            .then(songUrl => {
              songsWithUrls.push({
                ...song,
                coverUrl,
                songUrl
              });
            });
        })
        .catch(error => {
          console.error('Error getting presigned URLs:', error);
        });
    }))
    .then(() => songsWithUrls);
  }

const prev = () =>{
    setCurIndex(curIndex - 1 >= 0? curIndex - 1  : songList.length -1 )
    setPlay("play" )

}
const content = Array.from({ length: 50 }).map((_, i) => (
    <p key={i}>This is some sample content in the scrollable box.</p>
  ));

  const handleClose = () => {
    setIsVisible(false);    
    document.body.style.overflow = document.body.style.overflow == "hidden" ? "scroll" : "hidden"
    setCommentFeed(null)
  };
const next = () =>{
    setCurIndex(curIndex + 1 < songList.length? curIndex + 1  : 0)
    setPlay("play" )
}
function encodeSpecialCharacters(str) {
  return encodeURIComponent(str);
}
const comment = () =>{
    setIsVisible(true)
    document.body.style.overflow = document.body.style.overflow == "hidden" ? "scroll" : "hidden"
    axios
        .post(`https://gapy1nb8f1.execute-api.us-east-1.amazonaws.com/default/fetchcomments?trackId=${encodeSpecialCharacters(`${name} - ${songList[curIndex].songName}`)}`, {
        
      })
        .then((response) => {
          setCommentFeed(response.data);

        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
        });
}
useEffect(() => {

  getFamilyName();
}, []); 
useEffect(() =>{
    var albumsNew = `tracks/`
    getPresignedUrl("chiphoptracks", `avatar/${name}.jpg`)
      .then(url => {
        setImageURL(url);
      })
      .catch(error => {
        console.error('Error generating pre-signed URL:', error);
      });
    getSongsWithPresignedUrls(songPaths[`${name}`])
      .then(songsWithUrls => {
        setPath(songsWithUrls);
      })
      .catch(error => {
        console.error('Error setting songs state:', error);
      });
    },[])
useEffect(() =>{

    //   listDir("chiphoptracks",albumsNew)
    //   .then(url => {
    //     console.log(url);
    //   })
    //   .catch(error => {
    //     console.error('Error generating pre-signed URL:', error);
    //   });
if(audioEl.current && play === "play"){
    audioEl.current.play()

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
        if(audioEl.current && barEl.current){
        if(audioEl.current){
        setProgress(audioEl.current.currentTime/audioEl.current.duration * barEl.current.clientWidth)
        }
        if(barEl.current){
        setBarWidth(barEl.current.getClientRects()[0]["right"]-barEl.current.getClientRects()[0]["left"])
        }
        if(audioEl.current.ended){

            if (mode === 'order'){
                next()
                
            }
            else if(mode === 'loop'){
                audioEl.current.currentTime = 0
                
            }
            else if (mode === 'random'){
                setCurIndex(() => {
                    var rand = Math.floor(Math.random() * songList.length)
                    while (rand == curIndex){
                        rand = Math.floor(Math.random() * songList.length)
                    }
                    return rand

                }
                )
                
            }
            return
        }
        
        var value = Math.floor(audioEl.current.currentTime % 60)
        if (value>= 10){
       setPlayTime(`${Math.floor(audioEl.current.currentTime / 60)}:${value}`)
            }
        else{
        setPlayTime(`${Math.floor(audioEl.current.currentTime / 60)}:0${value}`)
            }
    }}, 100);
}

else if (audioEl.current){
    clearInterval(intervalRef.current)


    audioEl.current.pause()
}
})
const clickBar = (e) =>{
    if(audioEl.current.duration){
     audioEl.current.currentTime = ((e.clientX - barEl.current.getClientRects()[0]["x"])/barEl.current.getClientRects()[0]["width"] * audioEl.current.duration)
    }
    setProgress(audioEl.current.currentTime/audioEl.current.duration * barEl.current.clientWidth)
        
}
const togglePlay = ()=>{
setPlay(play == "pause" ? "play":"pause")
}
const toggleMode = ()=>{
setMode(mode == "order" ? "loop": mode == "loop"? "random" : "order")

}

// let image = require(`../avatar/${name}.jpg`)

const animation = useSpring({
    from:{    opacity: 0, 
        },
    to:{opacity: 1}
})

  return (
      
      <animated.div
      style = {animation}>
          
    {image ? <Color src={image} crossOrigin="anonymous" format="hex">
    {({ data, loading }) => {
      if (loading || !data) return;
      setColor(data)
      return ;
    }}
  </Color> : null}
  {image ? <Palette src={image} crossOrigin="anonymous" format="hex" colorCount={4}>
    {({ data, loading }) => {

      if (loading || !data) return;
      setColor(data[0])
      setSecondColor(data[1])
      return 
    }}
  </Palette> : null}
    <div className='songsPage'>
        <div id='background' style={{background:`linear-gradient(${color}, 99.9%, ${SecondColor})`}}>
       
            <div className='allinfo'>
            <img className='avatar circle' src ={image}/>
            <p className='singerName' style={{fontWeight: '400', color:`${resBgColor(hextoRgb(color))}`} }>{name}</p>
            
            </div>
        </div>
        <div className='container'>
            <div className='songs'>
        <h2 className='tracks'>Tracks</h2>
        <input type="text" id="myInput" placeholder=" Search by Track or Album Name.." onChange={event => {setTerm(event.target.value)}}/>
        {path ? path.map((thing, index) =>{
            if (1 + 1 === 2){
                const cover = thing.cover
                let path = thing.path
                const track = thing.songUrl
                
                const realName = thing.title
                const realImage = thing.coverUrl
                if (realName){
                var object = {albumName: thing.album, cover:realImage, songName: realName, audio:track }
                songList.push((object))

                }
            
                if(!term || (thing.title.toLowerCase().includes(term.toLowerCase()) || thing.album.toLowerCase().includes(term.toLowerCase()))){
                return <SongCard onclick = {(() => {
                    
                    songList.forEach((element,index) =>{
                        if (element.songName === realName ){
                            setCurIndex(index)
                            setPlay("play")
                            setCss('playerWrapperClicked')
                            setCss2('referenceBoxClicked')
                        }
                        })
                })} key={thing.title} artistName={name} albumName={thing.album} songName={realName} albumCover ={realImage} />
                }
                
            
            }
        }) : null}
        
{songList.length != 0?  <>
<div className= {`${Css} waves-effect`}   > 


   <img className='albumFace' src={`${songList[curIndex].cover}`}/> 
   <audio src={`${songList[curIndex].audio}`} ref = {audioEl}/>
   <div className='songinfo' >
       <div className='curSong'> {songList[curIndex].songName}</div>
       <div className='curAlbum'>{`${name} - ${songList[curIndex].albumName}`}</div>
       </div>
       <Color src={`${songList[curIndex].cover}`} crossOrigin="anonymous" format="hex">
        {({ data, loading }) => {
          if (loading) return;
          setCoverColor(data)
          return ;
        }}
      </Color>
       <div className='control'>

           <div className='bar' ref={barEl} style={{height:'6px', background: `${coverColor}`, transition:'background 0.7s ease-in-out'}} onClick = {clickBar}></div>
           <div className='barprogress' style={{height:'6px',background: `black`, width:`${progress}px`  }} onClick = {clickBar}></div>

           <div id='dot'  style={{ position:'relative', top:'8.5px', left: `${progress - 4}px`}}></div>
           <div id='time' style={{top:'9.5px'}}>{playtime}</div>
           <div id='buttons' style={{position:'relative', top: '14px'}}>
           
           <div id='playOrder'className='waves-effect waves-teal' onClick={toggleMode}>
               {mode === "order" ? <MdOrderBut/> :mode === "loop"? <MdLoopBut/>: <FaRandom/>}</div>
               <div id='play' className='waves-effect waves-light' style={{background:`${coverColor}`, color:`${resBgColor(hextoRgb(coverColor))}`, transition:'background 0.7s ease-in-out'}} onClick={togglePlay}>
                   {play === "pause" ? <MdPlayBut/> : <MdPauseBut/>}</div>
                   <div id='next' className='waves-effect waves-teal' onClick={next} ><MdNextBut/></div>
               
               <div id='playOrder'className='waves-effect waves-teal'  onClick={comment} >
               <Comment/></div>
               

            </div>
            </div> 
       </div>
       </> : null}
       
       </div>
       </div>
    <div className = {`whiteBox ${isVisible}`}> 
    <span className="close-icon" onClick={handleClose}>&times;</span>
    <div className='commentNumber'><p>{!commentFeed ? null : commentFeed.length + " Comments"}</p></div>

    <div className={`scrollable-box ` }  >
      <div className="scrollable-box-text">
       { !commentFeed ? <div><p style = {{fontWeight:'bold', textAlign:'center'}}>Loading...</p></div> : commentFeed.length == 0?
       <div><p style = {{fontWeight:'bold', textAlign:'center'}}><Ghost/><p style = {{color:'grey'}}>No Comments</p></p></div>:
       commentFeed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((comment) =>{
        return <UserComment
        key={comment.commentId}
        id={comment.commentId}
        username={comment.user}
        content={comment.content}
        timestamp={formatDate(comment.timestamp)}
        usercheck = {comment.usercheck === usercheck}
        deleteFunction = {handleDelete}
      />
       })
          
      // <UserComment username={"fuckdgagagadgagdasgdagazfuckdgagagadgagdasgdagaz"} content={"medagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg"} timestamp = {"2014-02-02"}/>
      // <UserComment username={"fuck"} content={"medagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg "} timestamp = {"2014-02-02"}/>
      }
            {/* // <UserComment username={"fuck"} content={"medagagadg medagagadgmedagagadgmedagagadgmedagagadgmedagagadg"} timestamp = {"2014-02-02"}/> */}
</div>

    </div>
    <div className='makeComment'>{isLoggedIn?
        <div>
        <input  value={songcomment} onChange={handleChange}/><span className='waves-effect'  onClick = {handleSubmit} style={{pointerEvents:`${songcomment.length == 0 ? 'none' : 'auto'}`}}><Send /></span>
        </div> : <p >Log In Before Sending a Comment :)</p>}
        </div>

    </div>
    {showNotification && (
        <Notification
          message={message}
          messageColor = {messageColor}
          duration={3000}
          onDismiss={handleNotificationDismiss}
        />
      )}


    <Background isVisible = {isVisible}/>
  
      
        </div>
        
    </animated.div>
  )
}