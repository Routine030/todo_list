import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';

  $.ajax({
    method: "GET",
    url: "http://localhost:3001/index2",
    dataType: "json",
   })
    .done(function( msg ) {
      //data=JSON.stringify(msg);
      //data=JSON.parse(data);
      ReactDOM.render(<App dbData={msg} />, document.getElementById('root'));
    });


/*
let msg = [{id:1,updatedAt:"2019-05-01 11:00",content:"嗨！大家好啊！",deltag: 1},
            {id:2,updatedAt:'2019-05-10',content:'早安啊！昨天有沒有好好發文？',deltag: 1},
            {id:3,updatedAt:'2019-05-01',content:'ㄛ！別說了，那真的超級累！',deltag: 0},
            {id:4,updatedAt:'2019-05-03',content:'哈哈哈！加油啦！再一下就結束了！',deltag: 0},
            {id:5,updatedAt:'2019-05-18',content:'結束後我一定要爆睡一頓！',deltag: 0},
            {id:5,updatedAt:'2019-05-18',content:'結束後我一定要爆睡一頓！',deltag: 0},
            {id:5,updatedAt:'2019-05-18',content:'結束後我一定要爆睡一頓！',deltag: 0},
            {id:5,updatedAt:'2019-05-18',content:'結束後我一定要爆睡一頓！',deltag: 0},
            {id:5,updatedAt:'2019-05-18',content:'結束後我一定要爆睡一頓！',deltag: 0},
            ]
ReactDOM.render(<App dbData={msg} />, document.getElementById('root'));*/



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
