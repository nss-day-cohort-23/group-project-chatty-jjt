"use strict";

let currentUser = "";

const themeDropdown = document.getElementById("dropdownMenuButton");

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
    
    let messageDateElement = document.createElement("p");
    let messageDate = new Date(message.timestamp).toLocaleString();
    let messageDateText = document.createTextNode(messageDate);
    messageDateElement.appendChild(messageDateText);
    messageDateElement.setAttribute("class", "timeStamp");

    let msgParagraph = document.createElement("p"),
    userNameTextNode = document.createTextNode(`${message.userName}:  `);
    if(message.userName === currentUser){
        userNameTextNode.textContent = "You:  ";
    }
    let contentTextNode = document.createTextNode(message.text);

    msgParagraph.setAttribute("class", "message-text-paragraph ");    

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button btn btn-outline-secondary");
    let deleteText = document.createTextNode("X");
    deleteButton.appendChild(deleteText);

    msgParagraph.appendChild(userNameTextNode);
    msgParagraph.appendChild(contentTextNode);    

    messageDiv.appendChild(messageDateElement);
    messageDiv.appendChild(msgParagraph);
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

module.exports.toggleClass= (DOMelement, className) => {
    DOMelement.classList.toggle(className);
};


module.exports.disableClearMessages = () => {
    document.getElementById("clear-button").classList.add("disabled");
};

module.exports.enableClearMessages = () => {
    document.getElementById("clear-button").classList.remove("disabled");
};

module.exports.setUser = (string) =>{
    currentUser = string;
    document.getElementById("user-Name").innerHTML = string;
};

module.exports.clearMessageContainer = () => {
    let chatBox = document.getElementById("message-container");
    chatBox.innerHTML = "";
};

module.exports.createThemeDropdown = (themeList) => {
    let dropdown = document.getElementById("dropdown-selection");
    for(let prop in themeList){
        let anchor = document.createElement("a");
        anchor.setAttribute("class", "dropdown-item");
        anchor.setAttribute("id", themeList[prop]);
        anchor.setAttribute("href", "#");
        let anchorText = document.createTextNode(prop);
        anchor.appendChild(anchorText);
        dropdown.appendChild(anchor);
    }
};

const removeOtherThemes = (object, currentTheme, themeList) => {
    for(let prop in themeList){
        if(object.classList.contains(themeList[prop]) && themeList[prop] !== currentTheme){
            object.classList.remove(themeList[prop]);
        }
    }
};

module.exports.setTheme = (object, themeClass, themeList, themeName) => {
    removeOtherThemes(object, themeClass, themeList);
    object.classList.add(themeClass);
    themeDropdown.innerHTML = themeName; 
};

module.exports.scrollToBottom = () => {
    let messageArray = [...document.getElementsByClassName("message-card")];
    let lastMessageIndex = messageArray.length -1;
    let lastMessage = messageArray[lastMessageIndex];
    //console.log("lastMessage", lastMessage);
    lastMessage.scrollIntoView(); 
    console.log(lastMessage);
};