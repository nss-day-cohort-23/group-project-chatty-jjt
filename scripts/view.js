"use strict";

let currentUser = "";

module.exports.printMessage = (message) => {
    let chatBox = document.getElementById("message-container");
    
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message-card");
    if(message.userName === currentUser){
        messageDiv.classList.add("you");
    } else {
        messageDiv.classList.add("other");
    }
    messageDiv.setAttribute("id", message.id);
    
    let paragraph = document.createElement("p"),
    userNameTextNode = document.createTextNode(`${message.userName}: `),
    contentTextNode = document.createTextNode(message.text);

    paragraph.appendChild(userNameTextNode);
    paragraph.appendChild(contentTextNode);

    messageDiv.appendChild(paragraph);

    chatBox.appendChild(messageDiv);
};

module.exports.printMessages = (messages, ammount) => {
    ammount = ammount > messages.length ? messages.length : ammount;
    for(let i = 0; i < ammount; i++){
            this.printMessage(messages[i]);
    }
};

module.exports.deleteMessage = (message) => {
    let messageDom = document.getElementById(`${message.id}`);
    messageDom.remove();
};

module.exports.deleteMessages = () => {
    let messageDom = document.getElementsByClassName("message-card");
    [...messageDom].forEach(element => {
        element.remove();
    });
};

module.exports.toggleStyle = () => {

};

module.exports.disableClearMessages = () => {
    document.getElementById("clear-button").classList.add("disabled");
};

module.exports.enableClearMessages = () => {
    document.getElementById("clear-button").classList.remove("disabled");
};

module.exports.setUser = (string) =>{
    currentUser = string;
};