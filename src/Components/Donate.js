import React from 'react'
import M from 'materialize-css';
import  './FrontPage.css'
import { ConBut } from './ConBut';
import { Card } from './Card';
import {names} from '../js/names'
import { DropDown } from './DropDown';
import { TopBar } from './topBar';
import { Link } from 'react-router-dom';
import { Stripe } from './MdPlay';
import { Pay } from './MdPlay';
import { useState } from 'react';
import './Donate.css'
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


export const Donate = () => {
  function handleSelectChange(event) {
    const selectedName = event.target.value;
    let selectedLink = '';

    // Determine the link based on the selected option
    switch(selectedName) {
      case '1':
        selectedLink = 'https://buy.stripe.com/8wMeV0gXX0hWdaMdQQ';
        break;
      case '2':
        selectedLink = 'https://buy.stripe.com/aEUaEK0YZ1m0daM145';
        break;
      case '3':
        selectedLink = 'https://buy.stripe.com/7sI6ou7nn6GkgmY9AC';
        break;
      case '4':
        selectedLink = 'https://buy.stripe.com/fZe006ePPd4I9YA6or';
        break;
      default:
        selectedLink = '';
        break;
    }

    // Update the state with the selected option and its corresponding link
    setSelectedOption({ name: selectedName, link: selectedLink });
  }
  const [selectedOption, setSelectedOption] = useState({ name: '1', link: 'https://buy.stripe.com/8wMeV0gXX0hWdaMdQQ' });

  const animation = useSpring({
    from:{    opacity: 0, 
        },
    to:{opacity: 1}
  })
  return (
      <React.Fragment>
        <animated.div style = {animation}>

        <div className='introbg'>
    <div className='container'>
<div className='introwrapper' >
    <h3>{`Thank You!`} </h3>
    <p className='accountText' >Developing, hosting, and maintaining this platform requires a significant amount of time and energy. Your support allows us to continue providing high-quality Chinese hip-hop music to our community. We truly appreciate your generosity.</p>
    </div>
    </div>
</div>

    


<div className='container' style= {{marginTop:'60px'}}>
    

<Pay />
<div className='selectWrap'>
<select style = {{display:'inline-block'}} value={selectedOption.name} onChange={handleSelectChange}>
      <option value="2" >$20</option>
      <option value="1">$5</option>
      <option value="3">$50</option>
      <option value="4">$100</option>
    </select>
    </div>
    <a href={`${selectedOption["link"]}`} style = {{color:"white"}}>

    <div id = 'submit' className = 'waves-effect waves-light' style={{backgroundColor:'#ff9100'}}>

                <Stripe />

            </div>
            </a>

    <h3 style={{marginTop:'70px'}}>Contacts</h3>
    <p style={{marginTop:'30px',marginBottom:'50px'}}>Reach Out for Collaboration, Music, Culture, Coding, or Life in General. &lt;3 Site Creator's Instagram: zhehaoww.</p>
    </div>


</animated.div>

    </React.Fragment>
  )
}
