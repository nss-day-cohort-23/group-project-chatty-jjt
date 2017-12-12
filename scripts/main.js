'use strict';

const model = require("./model.js");

let savedMessages = model.returnSavedMessages();
console.log("saved messages", savedMessages);
