import React from 'react'
import './submit.css'
import Color from 'color-thief-react'
import M from 'materialize-css'
import { useState,useEffect } from 'react'
 
import { Upload, Warning } from './MdPlay'
import {useSpring, animated} from 'react-spring'
import { getAccessToken } from '../s3Utils'
import axios from 'axios'
import {Auth} from 'aws-amplify'
import { Background } from './Background'
const defaultCover = require( '../pics/default.png')
export const Submit = () => {
const [css, setCss] = useState('')
const [vis1, setvis1] = useState(0)
const [message, setMessage] = useState('')
const [shade, setShade ] = useState('rgba(0,0,0,0.3)')
const [image, setImage] = useState(defaultCover)
const [color, setColor] = useState("#f44336")
const [isVisible, setIsVisible] = useState(true)
const [username, setUserName] = useState(null)
async function getUserName() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserName(user.username);
    } catch (error) {
      console.error('Error fetching user name:', error);
      return null;
    }
  }
useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);
useEffect(() => {

    getUserName();
  }, []); 
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
const handleClose = () =>{
    setIsVisible(false)
    document.body.style.overflow = "scroll"

}
const handleCover = (e) =>{
    if(e.target.files[0]){
      if (e.target.files[0].size > 5 * 1024 * 1024){
        setMessage('Please make sure the cover art file is less than 5 MB.')
        setvis1(1)
        setColor("#f44336")
        setInfo(() => {
            var cur = info
            cur[`songFile`] = ''
            return cur
        })
      }
    else{
    if (e.target.files[0].type.match('image.*')){
        console.log(e.target.files[0])
        setvis1(0)
        setImage(URL.createObjectURL(e.target.files[0]))
        setInfo(() => {
            var cur = info
            cur[`albumCover`] = e.target.files[0]
            return cur
        })
    }
    else{
        setMessage('Please select as album cover image files.')
        setvis1(1)
        setColor("#f44336")
        setInfo(() => {
            var cur = info
            cur[`songFile`] = ''
            return cur
        })


    }
}
    }
}
const handleSong = (e) =>{
    if(e.target.files[0]){
      if (e.target.files[0].size > 10 * 1024 * 1024){
        setMessage('Please make sure the audio file is less than 10 MB.')
        setvis1(1)
        setColor("#f44336")
        setInfo(() => {
            var cur = info
            cur[`songFile`] = ''
            return cur
        })
      }
    else{
    if (e.target.files[0].type.match('audio.*')){
        console.log(e.target.files[0])
        setvis1(0)
        setInfo(() => {
            var cur = info
            cur[`songFile`] = e.target.files[0]
            return cur
        })

    }
    else{
        setMessage('Please select as your track audio files.')
        setvis1(1)
        setColor("#f44336")
        setInfo(() => {
            var cur = info
            cur[`songFile`] = ''
            return cur
        })

    }
}
}
}
async function handleSubmit (e){
    e.preventDefault()
    const accessToken = await getAccessToken();
    if (!username) {
      setMessage('Something Went Wrong :/ Try Again Later');
      setvis1(1)
      setColor("#f44336")

      return;
    }
    if (!info.songFile) {
        setMessage('Please select the right files as your track or cover art.');
        setvis1(1)
        setColor("#f44336")
  
        return;
      }
      if (!accessToken) {
        setMessage('Something Went Wrong :/ Try Again Later');
        setvis1(1)
        setColor("#f44336")
  
        return;
      }
    // Replace with your API Gateway URL
    const apiGatewayUrl = 'https://w1bdt0wh97.execute-api.us-east-1.amazonaws.com/default/uploadtrack';
  
    // Set userId and trackId according to your application's logic
    const userId = encodeURIComponent(`${username}`);
    const trackId = encodeURIComponent(`${info.artist}#*$${info.albumName}#*$${info.songName}`);
  
    const filesToUpload = [
      { file: info.songFile, filePurpose: 'song' },
      ...(info.albumCover ? [{ file: info.albumCover, filePurpose: 'cover_art' }] : []),
    ];
  
    for (const { file, filePurpose } of filesToUpload) {
      var fileType = file.type.split('/')[1];
      
      try {
        const response = await axios.post(apiGatewayUrl, 
          { userId, 
            trackId, 
            fileType, 
            filePurpose
          },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${accessToken}`
        }
          },
         
        );
        // const { presignedUrl } = await response.data["presignedUrl"];
        //   console.log(response["data"]["presignedUrl"])
        const presignedUrl = response["data"]["presignedUrl"]
        // Upload the file to the S3 bucket using the presigned URL
        const uploadResponse = await axios.put(presignedUrl, file, {
            
            headers: {
                'Content-Type': filePurpose === 'cover_art' ? encodeURIComponent(`image/${fileType}`) : encodeURIComponent(`audio/${fileType}`),
            },
            
        });
        
        if (uploadResponse.status !== 200) {
            throw new Error(`Upload error: ${uploadResponse.status}`);
        }
  
        console.log(`${filePurpose} uploaded successfully`);
        setInfo({albumCover:'',
    songFile:'',
    songName:'',
    artist:'',
    albumName:''})
    setImage(defaultCover)
    setMessage('Track Uploaded Successfully! Thanks for Your Contribution.');
      setvis1(1)
      setColor("#4caf50")
      setShade('rgba(0,0,0,0.3)')
      document.body.style.overflow = "scroll"
      document.getElementById('songName').value = ''
      document.getElementById('artist').value = ''
      document.getElementById('albumName').value = ''
      document.getElementById('songFile').value = ''





      } catch (error) {
        console.error(`Error uploading ${filePurpose}:`, error);
        setMessage('Something Went Wrong :/ Try Again Later');
      setvis1(1)
      setColor("#f44336")

      return;
      }
    }
  ;
  
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
      
      <form onSubmit={handleSubmit}>
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
        <div className='warning' style={{color: `${color}`, opacity:`${vis1}`, transition: '0.3s ease-in-out'}}><div className='icon' ><Warning/></div> <span style={{display:'inline', color:{color}}}> {message}</span></div>
 
    </div>
    <div className='container' style={{marginTop : '130px'}}>
        <div className='fileWrapper'>
            <p style={{marginBottom : '24px'}}>Track</p>
        <input id='songFile' type="file" onChange={handleSong} required/>
      
            <p>Track Name</p>
            <input onChange={handleInput}id='songName' type={'text'} placeholder = 'Song Name...' required></input>
            <p >Artist</p>
            <input onChange={handleInput}id='artist' type={'text'} placeholder = 'Artist Name...' required></input>
            <p >Album Name (Optional)</p>
            <input  onChange={handleInput} id='albumName' type={'text'} placeholder = 'Album Name...'></input>
            <label >
            <div id = 'submit' className = 'waves-effect waves-light' style = {{backgroundColor:"#ff9100"}}>
                <Upload/>
            <input  style={{visibility:'hidden'}}   type={'submit'} ></input>
            
            </div>
            </label>
        </div>
        </div>
        </form>

    </div>
    <div className = {`whiteBox ${isVisible}`}> 
    <span className="close-icon" onClick={handleClose}>&times;</span>
    <div className='commentNumber'><p>Note</p></div>

    <div className={`scrollable-box ` }  >
      <div className="scrollable-box-text" style={{paddingTop:'-5px', top:'-22px', position:'relative'}}>
      <p>
    We encourage our users to contribute discontinued Chinese Hiphop tracks that have not yet been included
    in our platform. Your contributions are greatly appreciated and help us
    expand our collection of high-quality Chinese hip-hop music. Unfortunately, due to cost limitations, the size of each track is limited to 10 MB and album cover 5 MB.
  </p>
  <p>
    You can review and listen to the tracks you've contributed in your account
    page. Please note that our moderator will review each submitted track, and
    if it meets our criteria, we will add it to the site's present collection.
  </p>
  <p>
    Thank you for your active participation and for helping us grow and enrich
    our platform.
  </p>
    </div>
    </div>
   
       

    </div>
    <Background isVisible = {isVisible}/>
    </animated.div>
    </>
    
  )
}
