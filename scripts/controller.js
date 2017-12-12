"use strict";

const tempTextBoxName = document.getElementById("tempTextBoxElement");
const tempMessageDisplayBoxContainer = document.getElementById("messageContainer");
const tempClearAllMessagesButton = document.getElementById("clearButton");

tempTextBoxName.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        //this variable can hold the message text and pass it into the functions
        let brandNewMessage = tempTextBoxName.value;
        // execute printMessagetoDOM function
        // execute saveMessagetoJSON function
    }
});


tempMessageDisplayBoxContainer.addEventListener("click", function(event){
    if(event.target.classList.contains === "deleteButton"){
        // current target's id is saved to a variable so we can pass it into these functions
        let messageID = this.id;
        // execute deleteMessagefromDOM function
        // execute deleteMessageFromJSON function
    }
});

tempClearAllMessagesButton.addEventListener("click", function(event) {
    if(totalMessages = document.getElementsByClassName("messageCard")){
        // gather all message cards from the page, and then delete them all from the DOM and the JSON file
        for(let i = 0; i < totalMessages.length; i++){
            // run the deleteMessageFromDOM function on each message
            // run the deleteMessageFromJSON function on each message
        }
    }else {
        // run function that grays out the clear button

    }
});