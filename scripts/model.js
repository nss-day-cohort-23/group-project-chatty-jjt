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

// function messageBuilder (id, userName, text, timestamp){
//     /* jshint ignore:start */
//     this.id = id;
//     this.userName = userName;
//     this.text = text;
//     this.timeStamp = timestamp;
//     /* jshint ignore:end */
// }


module.exports.returnSavedMessages = () => {
    return savedMessages;
};

module.exports.loadJSON = () => {
    return new Promise(function (resolve, reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {resolve(JSON.parse(request.responseText).messages);});
        request.addEventListener("error", () => {console.log("The files weren't loaded correctly!");});
        request.open("GET", 'json/messages.json');
        request.send();
    });
};


module.exports.createMessage = (text, userName) => {
    let numberOfMessages = savedMessages.length;
    let currentMessageIndex = numberOfMessages + 1;
    let newMessage = {
        id: currentMessageIndex,
        text: text,
        userName: userName,
        timestamp: Date.now()
    };
    savedMessages.push(newMessage);
    return newMessage;
};

// createMessage("Jordan", "Hello");

module.exports.deleteMessage = (messageID) => {
    for (let i = 0; i < savedMessages.length; i++){
        if (savedMessages[i].id == parseInt(messageID)){
            savedMessages.splice(i, 1);
            console.log("in funtion", savedMessages);
        }
    }
};



