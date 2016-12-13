require('./setup');

describe('alexa-app-server', function() {
  it('should respond as Donald', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("This is the real Trump.\n");
        done();
      });
  });
});
