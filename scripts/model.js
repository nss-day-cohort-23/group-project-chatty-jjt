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
    $.ajax({
        method: "POST",
        url: "https://nss-group-project-chatty-jjt.firebaseio.com/messages.json",
        data: jsonString
    });

};

module.exports.deleteMessage = (id) => {
    let deleteRequest = new XMLHttpRequest();
    deleteRequest.open("DELETE", `https://nss-group-project-chatty-jjt.firebaseio.com/messages/${id}.json`);
    deleteRequest.send();
    $.ajax({
        method: "DELETE",
        url: `https://nss-group-project-chatty-jjt.firebaseio.com/messages/${id}.json`
    });
};