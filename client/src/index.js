import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';

  $.ajax({
    method: "GET",
    url: "http://localhost:3001/",
    dataType: "json",
   })
    .done(function( msg ) {
      ReactDOM.render(<App dbData={msg} />, document.getElementById('root'));
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        if(jqXHR.responseText){
            alert(textStatus+': '+jqXHR.responseText);
        }
        else{
            alert(textStatus+': '+errorThrown);
        }
    });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
