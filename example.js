var shout = require('./index.js');

// Make sure to have ERROR_SHOUT_BOT_TOKEN & ERROR_SHOUT_ENDPOINT set.
// ERROR_SHOUT_ENDPOINT can be a chatID, GroupID or a channel (but @channelName)
// Make sure the bot is authorized to post in the endpoint

shout.getBotName()
.then(function(name){
  console.log(name);
});

shout.sendError('Oh no - This is an error');

try{
  var testVar = null;
  testVar.doSomething();
} catch(error) {
  shout.sendError(error, 'error-shout-bot example', 'doSomething');
}
