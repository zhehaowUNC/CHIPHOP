import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from './AuthContext'
// import { ConfigureStore } from './redux/configureStore';
// import {Provider} from 'react-redux'
import {Amplify} from 'aws-amplify';
import {BrowserRouter} from "react-router-dom"
// import Provider from 'react-redux'
// import { ConfigureStore } from './redux/configureStore';
const root = ReactDOM.createRoot(document.getElementById('root'));


Amplify.configure({
  Auth: {
    region: 'us_east_1',
    userPoolId: 'us-east-1_ewGyto3V4',
    userPoolWebClientId: '1gngvbkbetno5uu573s6tibsot',
  },
});

// import {legacy_createStore} from 'redux'

// //ACTION
// const login  = () =>{
//   return {
//     type: 'LOGIN'
//   }
// }
// const logout  = () =>{
//   return {
//     type: 'LOGOUT'
//   }
// }
// //REDUCER
// const Reducer = ( state = false, action) =>{
//   switch(action.type){
//     case 'LOGIN':
//       return state.loggedIn = true;
//     case 'LOGOUT':
//       return state.loggedIn = false;
//   }
// }
// let store = legacy_createStore(Reducer)
// store.subscribe(()=> consolelog(store.getState()))
// store.dispatch(login)
// const store = ConfigureStore()

root.render(

<React.StrictMode>  
  {/* <Provider store={store}>  */}

  <AuthProvider>    <App />
  {/* </Provider> */}
  </AuthProvider>

  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
