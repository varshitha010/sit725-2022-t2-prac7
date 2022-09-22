var expect  = require("chai").expect;
var request = require("request");


  describe("Get array of projects", function() {
    var url = "http://localhost:3000/api/projects";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as array", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data).to.be.a('array');
            done()
          });
    });
  });

  describe("Post Project", function() {
      const formData={
        title: "Test title",
        description: "Test Description",
        image : "images/sample.jpg",
        link :"About Test data",
      }
   
    var url = "http://localhost:3000/api/projects";
    it("should return status 200", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("should return success message", function(done) {
        request.post({uri:url, formData:formData}, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.message).to.be.a('string', 'success');
            done()
          });
    });
  });