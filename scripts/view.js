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
    
    let nameParagraph = document.createElement("p"),
    textParagraph = document.createElement("p"),
    userNameTextNode = document.createTextNode(`${message.userName}: `);
    if(message.userName === currentUser){
        userNameTextNode.textContent = "You:";
    }
    let contentTextNode = document.createTextNode(message.text);

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

module.exports.printMessages = (messages, amount) => {
    
    // If the amount is greater than length, then set the amount equal to length.
    if(amount > messages.length){
        amount = messages.length;
    } else {
        // Slice messages to only contain the last (amount) of messages
        messages = messages.slice(messages.length-(amount-1), messages.length);
        amount = messages.length;
    }
    
    for(let i = 0; i < amount; i++){
        this.printMessage(messages[i]);
    }
};

module.exports.deleteMessage = (id) => {
    let messageCard = document.getElementById(`${id}`);
    messageCard.remove();
};

module.exports.deleteMessages = () => {
    let messageCards = document.getElementsByClassName("message-card");
    [...messageCards].forEach(element => {
        this.deleteMessage(element.id);
    });
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
    let messageContainer = document.getElementById("message-container");
    messageContainer.innerHTML = "";
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

const removeOtherThemes = (body, currentTheme, themeList) => {
    for(let prop in themeList){
        if(body.classList.contains(themeList[prop]) && themeList[prop] !== currentTheme){
            body.classList.remove(themeList[prop]);
        }
    }
};

module.exports.setTheme = (body, themeList, themeClass, themeName) => {
    removeOtherThemes(body, themeClass, themeList);
    body.classList.add(themeClass);
    themeDropdown.textContent = themeName; 
};

module.exports.scrollToBottom = () => {
    let messageCards = [...document.getElementsByClassName("message-card")];
    let lastMessageIndex = messageCards.length-1;
    let lastMessage = messageCards[lastMessageIndex];
    lastMessage.scrollIntoView();
};