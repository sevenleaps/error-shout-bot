var request = require('superagent');
var Promise = require('bluebird');
var assert = require('assert');


function Shout(botToken, chatId) {
  assert(botToken, 'botToken needs to be set');
  this.botToken = botToken;
  assert(chatId, 'chatId needs to be set');
  this.chatId = chatId;

  this.baseTelegramUrl = 'https://api.telegram.org/bot' + this.botToken + '/';
  this.botName = '';
}

Shout.prototype.getBotName = function getBotName() {
  var shout = this;
  return new Promise(function gettingBotName(resolve, reject) {
    if (shout.botName) {
      resolve(shout.botName);
    } else {
      var getMeUrl = shout.baseTelegramUrl + 'getMe';
      request
        .get(getMeUrl)
        .accept('application/json')
        .end(function nameGot(err, res) {
          if (err) {
            reject(err);
          } else {
            var hasError = res.body.hasOwnProperty('error_code');
            if (hasError) {
              reject(res.body.description);
            }
            shout.botName = res.body.result.username;
            resolve(shout.botName);
          }
        });
    }
  });
};

function buildMessageText(message, appName, methodName, detail) {
  var messageText = '*Date:* ' + new Date() + '\n';
  if (appName) {
    messageText = messageText + '*AppName:* ' + cleanText(appName) + '\n';
  }
  if (methodName) {
    messageText = messageText + '*MethodName:* ' + cleanText(methodName) + '\n';
  }
  if (detail) {
    messageText = messageText + '*Detail:* ' + cleanText(detail) + '\n';
  }
  messageText = messageText + '*Error:* \n' + cleanText(message);

  return messageText;
}

function cleanText(text) {
  text = String(text);
  text = text.replace(/_/g, '\\_');
  text = text.replace(/\*/g, '\\*');
  text = text.replace(/\`/g, '\\`');

  return text;
}

Shout.prototype.sendError = function sendError(message, appName, methodName, detail) {
  var shout = this;
  return new Promise(function sendingErrorMessage(resolve, reject) {
    var messageText = buildMessageText(message, appName, methodName, detail);
    request.post(shout.baseTelegramUrl + 'sendMessage')
      .accept('application/json')
      .send({
        chat_id: shout.chatId,
        text: messageText,
        parse_mode: 'Markdown'
      })
      .end(function messageSent(err, res) {
        if (err) {
          reject(err);
        } else {
          var hasError = res.body.hasOwnProperty('error_code');
          if (hasError) {
            reject(res.body.description);
          }
          resolve(res.body);
        }
      });
  });
};

module.exports = Shout;
