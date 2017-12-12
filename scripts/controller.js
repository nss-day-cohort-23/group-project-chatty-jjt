"use strict";
const view = require("./view");
const model = require("./model");

const inputBox = document.getElementById("input-box");
const messageContainer = document.getElementById("message-container");
const clearButton = document.getElementById("clear-button");

inputBox.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        //this variable can hold the message text and pass it into the functions
        let brandNewMessage = inputBox.value;

        // execute printMessagetoDOM function
        // DONT FORGET TO MAKE IT view.printMessages

        // execute saveMessagetoJSON function
        // DONT FORGET TO MAKE IT model.saveMessage
    }
});


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
clearButton.addEventListener("click", function(event) {
    if(totalMessages = document.getElementsByClassName("messageCard")){
        // gather all message cards from the page, and then delete them all from the DOM and the JSON file
        for(let i = 0; i < totalMessages.length; i++){
            // run the deleteMessageFromDOM function on each message
            // view.deleteMessage

            // run the deleteMessageFromJSON function on each message
            // model.deleteMessage
        }
    }else {
        // run function that grays out the clear button

    }
});

module.exports.loadMessages = function(){
    // gather messages from the JSON file and asign them to a variable
    let allMessages = model.loadJSON().then(messages => {
        view.printMessages(messages, 20);
    }); // might be a different function name
    // send those messages to the output function to print them to the DOM
};


// const darkThemeCheckbox = document.getElementById("dark-theme-checkbox");
// // darkThemeCheckbox.addEventListener("");
// darkThemeCheckbox.addEventListener("change", function(darkThemeCheckbox){
    
//         // call some function that toggles css classes to TURN OFF/ON dark theme
//         // view.toggleStyle();
    
// });