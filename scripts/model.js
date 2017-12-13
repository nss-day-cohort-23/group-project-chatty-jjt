'use strict';

// // Leave out Storage
// //require("firebase/storage");

//  // GET API KEY PLEASE
//  var config = {
//     apiKey: "AIzaSyAPb8HQ8Cn4xxDVSX0HbmQbKlhlodAsRPQ",
//     authDomain: "nss-group-project-chatty-jjt.firebaseapp.com",
//     databaseURL: "https://nss-group-project-chatty-jjt.firebaseio.com",
//     projectId: "nss-group-project-chatty-jjt",
//     storageBucket: "nss-group-project-chatty-jjt.appspot.com",
//     messagingSenderId: "252243494183"
//   };

//   firebase.initializeApp(config);



let savedMessages = [
    {
        id: "0",
        userName: "Joe",
        text: "Hey guys!  Whats up?",
        timestamp: "Tue Dec 12 2017 13:35:17 GMT-0600"
    },
    {
        id: "1",
        userName: "Jordan",
        text: "Not much!",
        timestamp: "Tue Dec 12 2017 13:35:17 GMT-0600"
    },
    {
        id: "2",
        userName: "Tim",
        text: "Hi!",
        timestamp: "Tue Dec 12 2017 13:35:17 GMT-0600"
    },

];

// function messageBuilder (id, userName, text, timestamp){
//     /* jshint ignore:start */
//     this.id = id;
//     this.userName = userName;
//     this.text = text;
//     this.timeStamp = timestamp;
//     /* jshint ignore:end */
// }


// module.exports.returnSavedMessages = () => {
//     return savedMessages;
// };

module.exports.loadJSON = (url) => {
    return new Promise(function (resolve, reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {
            let messagesObjects = JSON.parse(request.responseText);
            let messagesArray = toArray(messagesObjects);
            resolve(messagesArray);
        });
        request.addEventListener("error", () => {console.log("The files weren't loaded correctly!");});
        request.open("GET", url);
        request.send();
    });
};

const toArray = (messagesObject) => {
    let messagesArray = [];
    for(let prop in messagesObject){
        messagesObject[prop].id = prop;
        messagesArray.push(messagesObject[prop]);
    }
    messagesArray.sort((a, b) => a.timestamp - b.timestamp);
    return messagesArray;
};


module.exports.createMessage = (text, userName) => {
    let newMessage = {
        timestamp: Date.now(),
        text: text,
        userName: userName
    };

    sendMessage(newMessage);
    return newMessage;
};

const sendMessage = (obj) => {
    let json = JSON.stringify(obj);
    let request = new XMLHttpRequest();
    request.open("POST", "https://nss-group-project-chatty-jjt.firebaseio.com/messages.json");
    request.send(json);
};



module.exports.deleteMessage = (id) => {


    let request = new XMLHttpRequest();
    request.open("DELETE", `https://nss-group-project-chatty-jjt.firebaseio.com/messages/${id}.json`);
    //request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.send();
};

