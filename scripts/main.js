'use strict';
const model = require("./model.js");




let savedMessages = model.returnSavedMessages();
console.log("before", savedMessages);
model.deleteMessage("1");
console.log("after", savedMessages);