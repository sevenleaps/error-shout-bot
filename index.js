var request = require('superagent');
var Promise = require('bluebird');

var BOT_TOKEN = process.env.ERROR_SHOUT_BOT_TOKEN;
var ERROR_ENDPOINT = process.env.ERROR_SHOUT_ENDPOINT;

var botTokenIsNotSet = !BOT_TOKEN;
var errorEndPointIsNotSet = !ERROR_ENDPOINT;

if (botTokenIsNotSet) {
  console.log('ERROR_SHOUT_BOT_TOKEN environment variable not configured');
}

if(errorEndPointIsNotSet) {
  console.log('ERROR_SHOUT_ENDPOINT environment variable not configured');
}

var baseTelegramUrl = 'https://api.telegram.org/bot' + BOT_TOKEN + '/';

var botName;
function getBotName(){
  return new Promise(function gettingBotName(resolve, reject) {
    if (botName) {
      resolve(botName);
    } else {
      var getMeUrl = baseTelegramUrl + 'getMe';

      request
        .get(getMeUrl)
        .accept('application/json')
        .end(function nameGot(err, res){
          if (err) {
            reject(err);
          } else {
            var hasError = res.body.hasOwnProperty('error_code');
            if (hasError) {
              reject(res.body.description);
            }
            botName = res.body.result.username;
            resolve(botName);
          }
      });
    }
  });
};

function sendError(message, source, methodName){
  return new Promise(function sendingErrorMessage(resolve, reject) {

    var messageText = 'Date: ' + new Date() + '\n';
    if(source){
      messageText = messageText + 'Source: ' + source + '\n';
    }
    if(methodName){
      messageText = messageText + 'MethodName: ' + methodName + '\n';
    }
    messageText = messageText + 'Error: \n' + message;
    request.post(baseTelegramUrl + 'sendMessage')
      .accept('application/json')
      .send({
       chat_id: ERROR_ENDPOINT,
       text: messageText
      })
      .end(function messageSent(err, res){
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

module.exports = exports = {
  sendError,
  getBotName
};
