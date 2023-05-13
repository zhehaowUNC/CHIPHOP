import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { TopBar } from './Components/topBar';
import { Songs } from './Components/Songs';
import { Player } from './Components/Player';
import { FrontPage } from './Components/FrontPage';
import { Bottom } from './Components/Bottom';
import { Submit } from './Components/Submit';
import { LoginPage } from './Components/login';
import { RegisterPage } from './Components/register';
import { AccountPage } from './Components/Account';
import { useEffect, useContext } from 'react'

import { AuthContext } from './AuthContext';
import {Donate} from './Components/Donate'
function App() {
  const { authenticate, logout, getSession, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getSession();
  }, []);

  // const store = ConfigureStore()
    // const loggedIn = useSelector(state => state.loggedIn)
    return (  
    <Router>
      <TopBar/>
      <Routes>
      {/* <FrontPage/> */}
      {/* <Submit/> */}
      {isLoggedIn&&<Route path='/contribute' element = {<Submit/>}/>}

      <Route path='/home' element = {<FrontPage/>}/>
      {/* <Route path='/artist' component = {FrontPage}/> */}
 {/* <Songs name={'Ma Siwei'}/>  */}
      {isLoggedIn&& <Route path='account' element = {<AccountPage/>}/>}

      <Route path='*' element = {<FrontPage/>}/>
      <Route path='artist/:name' element = {<Songs/>}/>
      <Route path='login' element = {<LoginPage/>}/>
      <Route path='register' element = {<RegisterPage/>}/>
      <Route path='donate' element = {<Donate/>}/>






      </Routes>
      {/* <Navigate to ='/home'/> */}

      <Bottom />
      </Router>
    );
}

export default App;