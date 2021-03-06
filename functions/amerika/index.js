var alexa = require('alexa-app');
var app = new alexa.app('amerika');
var _ = require('underscore');
var superagent = require('superagent');

console.log('Loaded Amerika.');

module.change_code = 1; // allow this module to be reloaded by hotswap when changed

app.launch(function(req, res) {
  console.log('app.launch');
  return res
    .say("I'm your president. Would you like to make America great again?")
    .shouldEndSession(false)
});

app.intent('AMAZON.StopIntent', {
    "slots": {},
    "utterances": [
      "stop"
    ]
  },
  function(req, res) {
    console.log('app.AMAZON.StopIntent');
    return res.say("Doh svedahniya!");
  }
);

app.intent('AMAZON.CancelIntent', {
    "slots": {},
    "utterances": [
      "cancel"
    ]
  },
  function(req, res) {
    console.log('app.AMAZON.CancelIntent');
    return res.say("Doh svedahniya!");
  }
);

app.intent('AMAZON.HelpIntent', {
    "slots": {},
    "utterances": [
      "help"
    ]
  },
  function(req, res) {
    console.log('app.AMAZON.HelpIntent');
    return res
      .say("I'm your president. You can ask America to be great again and I will give you one of my priceless quotes.")
      .shouldEndSession(false)
  }
);

app.intent('AmerikaIntent', {
    "slots": {},
    "utterances": [
      "to be great again",
      "be great again",
      "great again",
      "yes"
    ]
  },
  function(req, res) {
    return superagent
      .get('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
      .then(function(rc) {
        return res
          .say(JSON.parse(rc.text).message)
          .say("<break strength='strong' />")
          .say("Make America great again!")
          .send();
      })
      .catch(function(err) {
        return res
          .say("Something went wrong.")
          .send();
      });
  }
);

if (process.env['ENV'] == 'lambda') {
  console.log("Starting Amerika on AWS lambda.")
  exports.handle = app.lambda();
} else if (process.env['ENV'] == 'development') {
  console.log("Starting Amerika in development mode.")
  module.exports = app;
} else {
  var fs = require('fs');
  fs.writeFileSync('schema.json', app.schema());
  fs.writeFileSync('utterances.txt', app.utterances());
  console.log('Schema and utterances exported.');
}