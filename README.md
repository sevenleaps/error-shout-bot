# error-shout-bot
Is a library that uses [Telegram](http://telegram.org) to send messages from your application. Useful so your application isn't throwing errors silently.

### Installation & Configuration ###

error-shout-bot is available as a npm package
```sh 
npm install error-shout-bot --save
```

Import the library and intialise it
```js
var errorShout = require('error-shout-bot');
var Shout = new errorShout(botToken, chatId);
```

**botToken** is a string that is unique to your bot. New bots and bot tokens can be requested from the [Telegram BotFather](https://telegram.me/botfather).

**chatId** is a string representing where you want the messages to get posted. There are 3 options for this:

1. *Individual user's chatId* - e.g. "123456789" - Find out you own by starting a chat with [IDBot](http://telegram.me/myidbot). NOTE: You need to start a conversation with your bot before it can message you
2. *Group's chatId* - e.g. "-123456789" - Find out a groups chat Id by adding [IDBot](http://telegram.me/myidbot) to the group. NOTE: Your bot needs to be added to the group before it can post in it.
3. *Channels* - e.g "@ErrorChannelName" - NOTE: Your bot needs to be admin of a channel to post in it.

### Usage ###

getBotName() - returns a promise that resolves with the bots name
```js
Shout.getBotName()
.then(function(name){
  console.log(name);
});
```

sendError(message, source, methodName) - returns a promise that will send the message to configured chatId
```js
Shout.sendError('Oh no, an error', 'error-shout-bot-example', 'doingSomething')
.then(function(responseFromTelegramApi){
  console.log('message sent');
})
.catch(function(error){
  //Error from request or telegram
  console.log(error);
});
```

The source and methodName of sendError are optional
```js
Shout.sendError('Oh no - This is an error');
```

Example of the message output:

----

**Date:** Mon Apr 25 2016 13:20:25 GMT+0100 (IST)

**Source:** error-shout-bot example

**MethodName:** doSomething

**Error:** 

TypeError: Cannot read property 'doSomething' of null
