require('../../setup');

describe('help', function() {
    it('should respond', function(done) {
        chai.request(server.express)
            .post('/alexa/amerika')
            .send(require('./fixtures/HelpIntentRequest.json'))
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.response.outputSpeech.type).to.equal('SSML')
                // when users ask for help within the skill, it must return a prompt which instructs users how to navigate the skill’s core functionality
                expect(data.response.outputSpeech.ssml).to.equal("<speak>I'm your new president. You can ask America to be great again and I will give you one of my priceless quotes.</speak>");
                // the help prompt must leave the session open to receive a response
                expect(data.response.shouldEndSession).to.equal(false);
                done();
            });
    });
});
