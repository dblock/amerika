var alexa = require('alexa-app');
var app = new alexa.app('amerika');
var _ = require('underscore');
var superagent = require('superagent');

console.log('Loaded Amerika.');

module.change_code = 1; // allow this module to be reloaded by hotswap when changed

app.launch(function(req, res) {
    console.log('app.launch');
    res
        .say("I'm your president. Ask me to make America great again.")
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
        res.say("Doh svedahniya!");
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
        res.say("Doh svedahniya!");
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
        res
            .say("I'm your president. Ask me to make America great again.")
            .shouldEndSession(false)
    }
);

app.intent('AmerikaIntent', {
        "slots": {},
        "utterances": [
            "to be great again"
        ]
    },
    function(req, res) {
        superagent
            .get('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
            .end(function(err, rc) {
                if (rc && rc.text) {
                    res
                        .say(JSON.parse(rc.text).message)
                        .say("Make America great again!")
                        .send();
                } else {
                    res.say("Something went wrong.").send();
                }
            });
        return false;
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
