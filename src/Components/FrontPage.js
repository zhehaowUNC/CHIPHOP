import React from 'react'
import M from 'materialize-css';
import  './FrontPage.css'
import { ConBut } from './ConBut';
import { Card } from './Card';
import {names} from '../js/names'
import { DropDown } from './DropDown';
import { TopBar } from './topBar';
import { Link } from 'react-router-dom';
import {useSpring,animated} from 'react-spring'

// import React, { Component } from 'react'

// export default class FrontPage extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       names = names
//     }
//   }
//   render() {
//     return (
//       <>
//       <div className='container'>
//     <div className='divider'></div>
//     <h2>Preface</h2>
//     <p className='intro'>This site is committed to the preservation of high-quality Chinese Hip-Hop music works 
//     that are either lesser-known to most listeners or have been taken down from major music platforms. 
//     The works included in this site might be subject to the site owner's personal preferences and are merely a tip of the iceberg 
//     of China's burgeoning Hip-Hop scene. Therefore, any form of contribution to this site's present collection 
//     is welcome and much appreciated.</p>
// <ConBut className= 'ConBut'/>

// <div className='divider Bot'></div>

// <h2>Artists</h2>

// {this.state.names.map
// <Card key={} />
//   }
// </div>


//     </>    )
//   }
// }

export const FrontPage = () => {
  const animation = useSpring({
    from:{    opacity: 0, 
        },
    to:{opacity: 1}
  })
  return (
      <React.Fragment>
        <animated.div style = {animation}>

      <div className='shadowBox'>

      <div className='container'>
    <h2>Preface</h2>
    <p className='intro'>This site is committed to the preservation of high-quality Chinese Hip-Hop music works 
    that are either lesser-known to most listeners or have been taken down from major music platforms. 
    The works featured on this site might be subject to the site owner's personal preferences and are merely a tip of the iceberg 
    of China's burgeoning Hip-Hop scene. Any form of contribution to this site
    is welcome and much appreciated.</p>
<ConBut/>

<div className='divider Bot'></div>


<h2 style={{position:'relative', top:'20px'}}>Artists</h2>

 {names.map((name) => {
   let image = require('../avatar/'+ name.path)
  return (<Card key={name.id} pic = {image} name = {name.name} link = {`../artist/${name.name}`}/>);
})
}


<div className='blank'>  
</div>
</div>
</div>
</animated.div>

    </React.Fragment>
  )
}
