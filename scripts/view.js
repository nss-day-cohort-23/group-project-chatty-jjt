"use strict";

let currentUser = "";

const themeDropdown = document.getElementById("dropdownMenuButton");

module.exports.printMessage = (message) => {
    
    let chatBox = $("#message-container");
    let messageDiv = $("<div></div>").addClass("message-card").attr("id", `${message.id}`);
    // let messageDiv = document.createElement("div");
    // messageDiv.classList.add("message-card");
    
    if(message.userName === currentUser){
        messageDiv.addClass("you");
    } else {
        messageDiv.addClass("other");
    }
    
    $(`<p>${new Date(message.timestamp).toLocaleString()}</p>`).addClass("timeStamp").appendTo(messageDiv);
    let messageTextPara = $(`<p></p>`).addClass("message-text-paragraph").appendTo(messageDiv);
    let userName = $(`<span>${message.userName}: </span>`).appendTo(messageTextPara);
    $(`<span>${message.text}</span>`).appendTo(messageTextPara);
    $(`<button>X</button>`).addClass("delete-button btn btn-outline-dark").appendTo(messageDiv);
     
    if(message.userName === currentUser){
        userName.text("You: ");
    }
      
    messageDiv.appendTo(chatBox);
    messageDiv[0].scrollIntoView();
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
    $(`#${id}`).remove();
};

module.exports.deleteMessages = () => {
    $(".message-card").remove();
};

module.exports.disableClearMessages = () => {
    $("#clear-button").addClass("disabled");
};

module.exports.enableClearMessages = () => {
    $("#clear-button").removeClass("disabled");
};

module.exports.setUser = (string) =>{
    currentUser = string;
    $("#user-Name").text(string);
};

module.exports.clearMessageContainer = () => {
    $("#message-container").text("");
};

module.exports.createThemeDropdown = function(themeList) {
    // let dropdown = $("#dropdown-selection");
    
    for(let prop in themeList){
        $("<a></a>").text(prop).addClass("dropdown-item").attr("id", themeList[prop]).attr("href", "#").appendTo($("#dropdown-selection"));
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
    themeDropdown.innerText = themeName; 
};

module.exports.scrollToBottom = () => {
    $("#message-container").scrollTop($("#message-container")[0].scrollHeight);
};