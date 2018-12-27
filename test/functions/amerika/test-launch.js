require('../../setup');

describe('alexa', function() {
    it('should respond', function(done) {
        chai.request(server.express)
            .post('/alexa/amerika')
            .send(require('./fixtures/LaunchRequest.json'))
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.response.outputSpeech.type).to.equal('SSML');
                // the session must remain open for a user response
                expect(data.response.shouldEndSession).to.equal(false);
                // a welcome prompt must be provided which describes what users can ask of the skill
                expect(data.response.outputSpeech.ssml).to.equal("<speak>I'm your new president. Would you like to make America great again?</speak>");
                done();
            });
    });
});
