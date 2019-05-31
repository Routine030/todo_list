import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';

async function initWeb(){
    try{
      var ret = await  $.ajax({
                method: "GET",
                url: "http://localhost:3001/",
                dataType: "json",
               })
    }
    catch(err){
      if(err.responseText){
        alert('error: '+err.responseText);
      }
      else{
       alert('error: '+err.statusText);
      }          
      return;
    }
    ReactDOM.render(<App dbData={ret} />, document.getElementById('root')); 
}

initWeb();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
