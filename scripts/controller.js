"use strict";
const view = require("./view");
const model = require("./model");
const firebase = require("firebase");
const login = require("./login");

const inputBox = $("#input-box");
const messageContainer = $("#message-container");
const clearButton = $("#clear-button");
const sendButton = $("#send-button");
const fontSizeSlider = $("#font-size-slider");
const themeDropup = $("#theme-dropup");
const body = $("#body");
const signInToggle = $("#signToggle");

let user = "";

// Name, Class
const themeList = {
    "Pepto-Bismal": "pepto",
    "Happy Blue": "light",
    "Moody": "dark",
    "Normal": "normal",
    "Chups": "chups"
};

module.exports.logOut = () => {
    view.clearMessageContainer();
    user = "";
    view.setUser(user);
};

const setSignToggleText = (string) => {
    signInToggle.innerText = string;
};

const tryToSaveNewMessage = () => {
    if(user !== ""){
        saveNewMessage();
        toggleClearButton();
    } else {
        showPleaseLogin();
    }
};

module.exports.activateListeners = () => {
    // let messageArray = document.getElementsByClassName("message-card");
    // let messageArray2 = $.makeArray($(".message-card"));
    let messageArray = $(".message-card");

    console.log("messageArray2", messageArray);
    
    signInToggle.on("click", (event) => {
        if(user === ""){
            this.login(); 
        } else {
            setSignToggleText("Sign In");
            login.googleSignout(this.logOut);
        } 
    });
    
    inputBox.on("keyup", function(event) {
        if(event.keyCode === 13){
            tryToSaveNewMessage();
        }
    });
    
    sendButton.on("click", function(event) {
        tryToSaveNewMessage();
    });

    messageContainer.on("click", function(event){
        if($(event.target).hasClass("delete-button")){
            let messageID = event.target.parentNode.id;
            view.deleteMessage(messageID);
            model.deleteMessage(messageID);
        }
    });
    
    clearButton.on("click", () => {
        
        if((messageArray !== undefined) && (!clearButton.hasClass("disabled"))){
            view.deleteMessages();
            toggleClearButton();
        }
    });

    themeDropup.on("click", () => {
            for(let prop in themeList){
                if(themeList[prop] === event.target.id){
                    view.setTheme(body, themeList, themeList[prop], prop);  
                    view.scrollToBottom();
                }
            }
    });

    fontSizeSlider.on("change", function(){
        messageArray.forEach(element => {
            element.style.fontSize = `${fontSizeSlider.value}em`;
        });
    });
};

module.exports.login = () => {
    login.signIn().then(userName => {
        if(userName !== ""){
            setSignToggleText("Sign Out");
            user = userName;
            view.setUser(user);
            this.loadMessages();
            this.hidePleaseLogin();
            listenToDatabase();
        }
    });
};

const showPleaseLogin = () => {
    document.getElementById("pleaseLogin").hidden = false;
};

module.exports.hidePleaseLogin = () => {
    document.getElementById("pleaseLogin").hidden = true;
};

const saveNewMessage = () => {
    let brandNewMessage = inputBox.val();
    if(brandNewMessage.length !== 0){
        view.printMessage(model.createMessage(brandNewMessage, user));
        inputBox.val("");
    }
};

module.exports.loadMessages = function(){
    model.loadJSON("https://nss-group-project-chatty-jjt.firebaseio.com/messages.json")
    .then(messages => {  
        view.clearMessageContainer();
        view.printMessages(messages, 20);
        toggleClearButton(); 
    });
};

const toggleClearButton = () => {
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

module.exports.createThemeDropdown = () => {
    view.createThemeDropdown(themeList);
};

const listenToDatabase = () => {
    let messagesDatabase = firebase.database().ref("messages");
    messagesDatabase.on('value', (snapshot) => {
        let messages = model.convertObjectsToArray(snapshot.val());
        view.clearMessageContainer();
        view.printMessages(messages, 20);
    });
};