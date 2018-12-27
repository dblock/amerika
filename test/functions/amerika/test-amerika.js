require('../../setup');

describe('alexa', function() {
    momIntentRequest = function(cb) {
        chai.request(server.express)
            .post('/alexa/amerika')
            .send(require('./fixtures/AmerikaIntentRequest.json'))
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.response.outputSpeech.type).to.equal('SSML')
                cb(data.response);
            });
    }

    it('makes America great again', function(done) {
        momIntentRequest(function(response) {
            expect(response.outputSpeech.ssml).to.startWith("<speak>");
            expect(response.outputSpeech.ssml).to.endWith("Make America great again!</speak>");
            expect(response.shouldEndSession).to.equal(true);
            done();
        });
    });
});
