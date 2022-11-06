import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './Utilities/ScrollToTop';
import { Provider } from 'react-redux';
import store from "./store/index"
import { Auth0Provider } from "@auth0/auth0-react";
import { FirebaseContext } from "./components/FirebaseContext";




ReactDOM.render(
  // <React.StrictMode>
    <Router>
<Auth0Provider
  domain={process.env.REACT_APP_AUTH_DOMAIN}
  clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
  redirectUri={window.location.origin}
  cacheLocation="localstorage"
  >
    <ScrollToTop/> 
     <Provider store={store}>
     <FirebaseContext>
      <App />
      </FirebaseContext>
      </Provider>
     </Auth0Provider>
     </Router>    
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
