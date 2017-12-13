"use strict";
const controller = require("./controller");

controller.setUser();

// const model = require('./model');
// model.loadFile("https://nss-group-project-chatty-jjt.firebaseio.com/messages.json").then(data => {
//     console.log("firebase", data);
// });

// const login = require("./login.js");
// login.signIn();


// const sendData = () => {
//     let obj = {
//         "userName": "Tim",
//         "timestamp": "time",
//         "id": "5",
//         "text": "Hey! Howa re you ?"
//     };

//     let json = JSON.stringify(obj);

//     let request = new XMLHttpRequest();
//     request.open("POST", "https://nss-group-project-chatty-jjt.firebaseio.com/messages.json");
//     //request.setRequestHeader('Content-type','application/json; charset=utf-8');
//     request.send(json);
// };

// const deleteData = () => {
//     let obj = {
//         "userName": "Tim",
//         "timestamp": "time",
//         "id": "5",
//         "text": "Hey! Howa re you ?"
//     };

//     let json = JSON.stringify(obj);

//     let request = new XMLHttpRequest();
//     request.open("DELETE", "https://nss-group-project-chatty-jjt.firebaseio.com/messages/-L0GNu5M--1UTlQpDOni.json");
//     //request.setRequestHeader('Content-type','application/json; charset=utf-8');
//     request.send(json);
// };

// // deleteData();

// //sendData();