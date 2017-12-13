"use strict";
const firebase = require("firebase");

const loadAPI = () => {
    return new Promise(function (resolve, reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {
            resolve(JSON.parse(request.responseText));
        });
        request.addEventListener("error", () => {console.log("The files weren't loaded correctly!");});
        request.open("GET", "../scripts/apiKey.json");
        request.send();
    });
};

module.exports.signIn = () => {
    return new Promise(function(resolve, reject) { 
        let apiKey = "";
        loadAPI().then( (data) => {
            apiKey = data.key;
                    // Initialize Firebase
            let config = {
                apiKey: apiKey,
                authDomain: "nss-group-project-chatty-jjt.firebaseapp.com",
                databaseURL: "https://nss-group-project-chatty-jjt.firebaseio.com",
                projectId: "nss-group-project-chatty-jjt",
                storageBucket: "nss-group-project-chatty-jjt.appspot.com",
                messagingSenderId: "252243494183"
            };
            firebase.initializeApp(config);
            googleSignin().then( data => {
                resolve(data);
            });
            // document.getElementById("signIn").addEventListener("click", googleSignin);
        // document.getElementById("signOut").addEventListener("click", googleSignout);    
        });
    });  
};


let provider  = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    return new Promise(function(resolve, reject) { 
        firebase.auth()
        .signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
                
            // console.log(token);
            // console.log("user", user);
            resolve(user.displayName);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
                
            console.log(error.code);
            console.log(error.message);
        });
    });
}

module.exports.googleSignout = () => {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull');
   }, function(error) {
      console.log('Signout Failed');
   });
};