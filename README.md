

# error-shout-bot
Don't let your errors be silent, let them shout!

error-shout-bot a library that uses [Telegram](http://telegram.org) to send messages from your application. Get real-time messages from your application directly to your phone or PC.

[![dependencies up to date](https://david-dm.org/sevenleaps/error-shout-bot.svg)](https://david-dm.org/sevenleaps/error-shout-bot)

[![npm version](https://badge.fury.io/js/error-shout-bot.svg)](https://badge.fury.io/js/error-shout-bot)

[![Build Status](https://travis-ci.org/sevenleaps/error-shout-bot.svg?branch=master)](https://travis-ci.org/sevenleaps/error-shout-bot)
#[error-shout-bot](http://github.com/sevenleaps/error-shout-bot)

### Installation & Configuration ###

error-shout-bot is available as a [npm package](https://www.npmjs.com/package/error-shout-bot)
```sh
npm install error-shout-bot --save
```

Import the library and intialise it
```js
var ErrorShout = require('error-shout-bot');
var Shout = new ErrorShout(botToken, chatId);
```

**botToken** is a string that is unique to your bot. New bots and bot tokens can be requested from the [Telegram BotFather](https://telegram.me/botfather).

**chatId** is a string representing where you want the messages to get posted. There are 3 options for this:

1. *Individual user's chatId* - e.g. "123456789" - Find out you own by starting a chat with [IDBot](http://telegram.me/myidbot). NOTE: You need to start a conversation with your bot before it can message you
2. *Group's chatId* - e.g. "-123456789" - Find out a groups chat Id by adding [IDBot](http://telegram.me/myidbot) to the group. NOTE: Your bot needs to be added to the group before it can post in it.
3. *Channels* - e.g "@ErrorChannelName" - NOTE: Your bot needs to be admin of a channel to post in it.

### Usage ###

##### getBotName() #####
returns a promise that resolves with the bots name
```js
Shout.getBotName()
.then(function(name){
  console.log(name);
});
```
### -- sendError with object -- ###
##### sendError(messageObject) #####
returns a promise that will format messageObject and send the message to configured chatId
```js
Shout.sendError({
  message: 'An error with a complex object',
  error: {
    levelOne: {
      levelTwo: {
        levelThree: {
          usefulInfo: '1+1=2'
        }
      }
    }
  },
  anyRandomKey: 'meow',
  number: 123,
  boolean: false
});
.then(function(responseFromTelegramApi){
  console.log('message sent');
})
.catch(function(error){
  //Error from request or telegram
  console.log(error);
});
```

##### Example message's output: #####

**Date:** Mon Apr 25 2016 13:20:25 GMT+0100 (IST)

**message:**
An error with a complex object

**error:**
```js
{
  levelOne: {
    levelTwo: {
      levelThree: {
        usefulInfo: "1+1=2"
      }
    }
  }
}
```
**anyRandomKey:**

meow

**number:**

123

**boolean:**

false

### -- sendError with strings -- ###
##### sendError(message, source, methodName, detail) #####
returns a promise that will send the message to configured chatId
```js
Shout.sendError('Oh no, an error', 'error-shout-bot-example', 'doingSomething' 'This could be a description of why this was sent')
.then(function(responseFromTelegramApi){
  console.log('message sent');
})
.catch(function(error){
  //Error from request or telegram
  console.log(error);
});
```

The "source", "methodName" and "detail" parameters of sendError are optional
```js
Shout.sendError('Oh no - This is an error');
```

##### Example of the message output: #####

**Date:** Mon Apr 25 2016 13:20:25 GMT+0100 (IST)

**Source:** error-shout-bot example

**MethodName:** doSomething

**Detail:** Failed to do something.

**Error:**

TypeError: Cannot read property 'doSomething' of null
