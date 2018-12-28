require('../../setup');

describe('cancel', function() {
  it('should respond', function(done) {
    chai.request(server.express)
      .post('/alexa/amerika')
      .send(require('./fixtures/CancelIntentRequest.json'))
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        var data = JSON.parse(res.text);
        expect(data.response.outputSpeech.type).to.equal('SSML')
        expect(data.response.outputSpeech.ssml).to.equal("<speak>Doh svedahniya!</speak>");
        done();
      });
  });
});