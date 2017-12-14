"use strict";
const view = require("./view");
const model = require("./model");
const login = require("./login");


const inputBox = document.getElementById("input-box");
const messageContainer = document.getElementById("message-container");
const clearButton = document.getElementById("clear-button");
const sendButton = document.getElementById("send-button");
const fontSizeSlider = document.getElementById("font-size-slider");
const theme = document.getElementById("theme-dropup");
const body = document.getElementById("body");
const signOut = document.getElementById("signOut");

// Name, Class
let themeList = {
    "Pepto-Bismal": "pepto",
    "Happy Blue": "light",
    "Moody": "dark",
    "Normal": "normal",
    "Chups": "chups"
};

let user = "";

module.exports.setUser = () => {
    login.signIn().then(data => {
        user = data;
        view.setUser(user);
        this.loadMessages();
        this.createThemeDropdown();
    });
};

signOut.addEventListener("click", () => {
    login.googleSignout();
    user = "";
});

inputBox.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        if(user !== ""){
            saveNewMessage();
            checkClearButton();
        }
    }
});

sendButton.addEventListener("click", function(event) {
        if(user !== ""){
            saveNewMessage();
            checkClearButton();
        }
});

const saveNewMessage = () => {
    let brandNewMessage = inputBox.value;
    if(brandNewMessage.length === 0){
        // document.getElementById("empty-validation").toggle();
        console.log("empty");
    }else{
        view.printMessage(model.createMessage(brandNewMessage, user));
        inputBox.value = "";
    }
    // messageContainer.scrollTop = messageContainer.sc;

};


messageContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-button")){
        // current target's id is saved to a variable so we can pass it into these functions
        let messageID = event.target.parentNode.id;
        view.deleteMessage(messageID);
        model.deleteMessage(messageID);
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
    let allMessages = model.loadJSON("https://nss-group-project-chatty-jjt.firebaseio.com/messages.json").then(messages => {  
    //view.setUser(user);
        view.clearMessageContainer();
        view.printMessages(messages, 20);
        checkClearButton();
        
    }); // might be a different function name
    // send those messages to the output function to print them to the DOM
    // messageContainer.scrollTop = messageContainer.scrollHeight;
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


theme.addEventListener("click", () => {

    for(let prop in themeList){
        if(themeList[prop] === event.target.id){
            view.setTheme(body, themeList[prop], themeList, prop);  
            view.scrollToBottom();
        }
    }
     // why doesnt this work?

    
});

module.exports.createThemeDropdown = () => {
    view.createThemeDropdown(themeList);
};

fontSizeSlider.addEventListener("change", function(){
    let messageCards = document.getElementsByClassName("message-card");
    [...messageCards].forEach(element => {
        console.log(fontSizeSlider.value);
        element.style.fontSize = `${fontSizeSlider.value}em`;
    });
});