'use strict';

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

module.exports.messageBuilder = (id, userName, text, timestamp) => {
    /* jshint ignore:start */
    this.id = id;
    this.userName = userName;
    this.text = text;
    this.timeStamp = timestamp;
    /* jshint ignore:end */
};

// example of creating new message
// let newMessage = new messageBuilder('04', 'Jordan', 'Howdy', 'timestamp');
// saveMessage(newMessage);

module.exports.returnSavedMessages = () => {
    return savedMessages;
};

module.exports.loadJSON = () => {
    return new Promise(function (resolve, reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {resolve(JSON.parse(request.responseText));});
        request.addEventListener("error", () => {console.log("The files weren't loaded correctly!");});
        request.open("GET", 'json/messages.json');
        request.send();
    });
};

module.exports.saveMessage = (message) => {
    savedMessages.push(message);
};


module.exports.deleteMessage = (messageID) => {
    for (let i = 0; i < savedMessages.length; i++){
        if (savedMessages[i].id == parseInt(messageID)){
            savedMessages.splice(i, 1);
            console.log("in funtion", savedMessages);
        }
    }
};



