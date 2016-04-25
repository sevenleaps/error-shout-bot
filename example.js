var errorShout = require('./index.js');

//Reading in token and chatId from environment variables
var BOT_TOKEN = process.env.ERROR_SHOUT_BOT_TOKEN;
var ERROR_CHAT_ID = process.env.ERROR_SHOUT_CHAT_ID;

var Shout = new errorShout(BOT_TOKEN, ERROR_CHAT_ID);

// Make sure to have ERROR_SHOUT_BOT_TOKEN & ERROR_SHOUT_ENDPOINT set.
// ERROR_SHOUT_ENDPOINT can be a chatID, GroupID or a channel (but @channelName)
// Make sure the bot is authorized to post in the endpoint

// getBotName - This can be used to log the name of the bot that is configured
Shout.getBotName()
.then(function(name){
  console.log(name);
});

// sendError - Example of a simple message
Shout.sendError('Oh no - This is an error');

// sendError - Example of a message with a source and methodName inside a catch
try{
  var testVar = null;
  testVar.doSomething();
} catch(error) {
  Shout.sendError(error, 'error-shout-bot example', 'doSomething');
}
