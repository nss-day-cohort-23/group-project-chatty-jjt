'use strict';

const convertObjectsToArray = (messageObjects) => {
    let messagesArray = [];

    for(let property in messageObjects){
        messageObjects[property].id = property;
        messagesArray.push(messageObjects[property]);
    }

    messagesArray.sort((a, b) => a.timestamp - b.timestamp);

    return messagesArray;
};

module.exports.convertObjectsToArray = convertObjectsToArray;

module.exports.loadJSON = (url) => {
    return new Promise(function (resolve, reject){
        // let JSONRequest = new XMLHttpRequest();
        // JSONRequest.addEventListener("load", () => {
        //     let receivedObjects = JSON.parse(JSONRequest.responseText);
        //     let messagesArray = convertObjectsToArray(receivedObjects);
        //     resolve(messagesArray);
        // });
        // JSONRequest.addEventListener("error", () => {
        //     console.log("The files weren't loaded correctly!");
        // });
        // JSONRequest.open("GET", url);
        // JSONRequest.send();

        $.ajax({
            url:`${url}`
        }).done((dataObject) =>{
            console.log('dataObject', dataObject);
            let messagesArray = convertObjectsToArray(dataObject);
            resolve(messagesArray);
        });
    });

};

module.exports.createMessage = (text, userName) => {
    let newMessage = {
        timestamp: Date.now(),
        text: text,
        userName: userName
    };

    saveMessage(newMessage);
    
    return newMessage;
};

const saveMessage = (obj) => {
    let jsonString = JSON.stringify(obj);

    let postRequest = new XMLHttpRequest();
    postRequest.open("POST", "https://nss-group-project-chatty-jjt.firebaseio.com/messages.json");
    postRequest.send(jsonString);
};

module.exports.deleteMessage = (id) => {
    let deleteRequest = new XMLHttpRequest();
    deleteRequest.open("DELETE", `https://nss-group-project-chatty-jjt.firebaseio.com/messages/${id}.json`);
    deleteRequest.send();
};