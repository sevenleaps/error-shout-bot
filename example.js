// In your project it would be requiring 'error-shout-bot'
var errorShout = require('./index.js');

// Reading in token and chatId from environment variables
var botToken = process.env.ERROR_SHOUT_BOT_TOKEN;
var chatId = process.env.ERROR_SHOUT_CHAT_ID;

// chatId can be a chatID, GroupID or a channel (e.g @channelName)
// Make sure the bot is authorized to post in the configured place
var Shout = new errorShout(botToken, chatId);

// getBotName - This can be used to log the name of the bot that is configured
Shout.getBotName()
.then(function(name) {
  /* eslint-disable no-console */
  console.log(name);
  /* eslint-disable no-console */
});

// sendError - Example of a simple message
Shout.sendError('Oh no - This is an error');

// sendError - Example of a message with a source and methodName inside a catch
try {
  var testVar = null;
  testVar.doSomething();
} catch (error) {
  Shout.sendError(error, 'error-shout-bot example', 'doSomething', 'This is showing an error in a catch');
}
