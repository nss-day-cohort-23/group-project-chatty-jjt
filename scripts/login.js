"use strict";

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
    loadAPI().then( (data) => {
        console.log(data);
    });  
};

