"use strict";
const view = require("./view");
const model = require("./model");

const inputBox = document.getElementById("input-box");
const messageContainer = document.getElementById("message-container");
const clearButton = document.getElementById("clear-button");
const sendButton = document.getElementById("send-button");
const theme = document.getElementById("theme-dropup");

let themeList = {
    "light": "light",
    "dark": "dark",
    "normal": "normal"
};

let user = "Joe";

inputBox.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        saveNewMessage();
        checkClearButton();
    }
});

sendButton.addEventListener("click", function(event) {
        saveNewMessage();
        checkClearButton();
});

const saveNewMessage = () => {
    let brandNewMessage = inputBox.value;
    view.printMessage(model.createMessage(brandNewMessage, user));
    inputBox.value = "";
};


messageContainer.addEventListener("click", function(event){
    if(event.target.classList.contains === "deleteButton"){
        // current target's id is saved to a variable so we can pass it into these functions
        let messageID = this.parentNode.id;
        // execute deleteMessagefromDOM function
        // view.clearMessages

        // execute deleteMessageFromJSON function
        // model.clearMessages
    }
});

// CLEAR BUTTON
clearButton.addEventListener("click", () => {
    let totalMessages = document.getElementsByClassName("message-card");
    if(totalMessages !== undefined && !clearButton.classList.contains("disabled")){
        view.deleteMessages();
        checkClearButton();
    }
});

module.exports.loadMessages = function(){
    // gather messages from the JSON file and asign them to a variable
    let allMessages = model.loadJSON().then(messages => {
        view.setUser(user);
        view.printMessages(messages, 20);
        checkClearButton();
    }); // might be a different function name
    // send those messages to the output function to print them to the DOM
};


const checkClearButton = () => {
    if(areMessages() === true){
        view.enableClearMessages();
    } else {
        view.disableClearMessages();
    }
};

const areMessages = () => {
    let messages = document.querySelectorAll(".message-card");
    if(messages[0] !== undefined){
        return true;
    } else {
        return false;
    }
};

// const darkThemeCheckbox = document.getElementById("dark-theme-checkbox");
// // darkThemeCheckbox.addEventListener("");
// darkThemeCheckbox.addEventListener("change", function(darkThemeCheckbox){
    
//         // call some function that toggles css classes to TURN OFF/ON dark theme
//         // view.toggleStyle();
    
// });

theme.addEventListener("click", () => {
    for(let prop in themeList){
        if(prop === event.target.id){
            messageContainer.classList.add(themeList[prop]);
            removeOtherTheme(themeList[prop]);
        }
    }
});

const removeOtherTheme = (currentTheme) => {
    for(let prop in themeList){
        if(messageContainer.classList.contains(themeList[prop]) && themeList[prop] !== currentTheme){
            messageContainer.classList.remove(themeList[prop]);
        }
    }
};