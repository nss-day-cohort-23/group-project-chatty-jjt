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
    
    let nameParagraph = document.createElement("p"),
    textParagraph = document.createElement("p"),
    userNameTextNode = document.createTextNode(`${message.userName}: `),
    contentTextNode = document.createTextNode(message.text);

    nameParagraph.setAttribute("class", "message-text-paragraph");    
    textParagraph.setAttribute("class", "message-text-paragraph");

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button btn btn-outline-secondary");
    let deleteText = document.createTextNode("X");
    deleteButton.appendChild(deleteText);

    nameParagraph.appendChild(userNameTextNode);
    textParagraph.appendChild(contentTextNode);

    messageDiv.appendChild(nameParagraph);
    messageDiv.appendChild(textParagraph);    
    messageDiv.appendChild(deleteButton);
    chatBox.appendChild(messageDiv);
    messageDiv.scrollIntoView();
};

module.exports.printMessages = (messages, ammount) => {
    ammount = ammount > messages.length ? messages.length : ammount;
    for(let i = 0; i < ammount; i++){
            this.printMessage(messages[i]);
    }
};

module.exports.deleteMessage = (id) => {
    let messageDom = document.getElementById(`${id}`);
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
