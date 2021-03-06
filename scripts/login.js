"use strict";
const firebase = require("firebase");
let provider = new firebase.auth.GoogleAuthProvider();

const loadAPI = () => {
    return new Promise(function (resolve, reject){
        let apiRequest = new XMLHttpRequest();
        apiRequest.addEventListener("load", () => {
            resolve(JSON.parse(apiRequest.responseText));
        });
        apiRequest.addEventListener("error", () => {
            console.log("The files weren't loaded correctly!");
        });
        apiRequest.open("GET", "../scripts/apiKey.json");
        apiRequest.send();
    });
};

const initializeFirebase = (key) => {
    let config = {
        apiKey: key,
        authDomain: "nss-group-project-chatty-jjt.firebaseapp.com",
        databaseURL: "https://nss-group-project-chatty-jjt.firebaseio.com",
        projectId: "nss-group-project-chatty-jjt",
        storageBucket: "nss-group-project-chatty-jjt.appspot.com",
        messagingSenderId: "252243494183"
    };

    // If firebase is not initialized, initialize it.
    if(firebase.apps.length === 0){
        firebase.initializeApp(config);
    }
};

module.exports.signIn = () => {
    return new Promise(function(resolve, reject) {
        loadAPI().then((apiKey) => {
            initializeFirebase(apiKey.key);
            // googleSignin().then( userName => {
            //     resolve(userName);
            // });
            resolve("Gordon");
        });
    });  
};

const googleSignin = () => {
    return new Promise((resolve, reject) => { 
        firebase.auth()
        .signInWithPopup(provider).then((userData) => {
            resolve(userData.user.displayName);
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    });
};

module.exports.googleSignout = (logOutFunction) => {
   firebase.auth()
   .signOut().then(
    () => {
      logOutFunction();
   }, 
   (error) => {
      console.log('Signout Failed');
   });
};