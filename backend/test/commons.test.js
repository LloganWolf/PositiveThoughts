const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../assets/config');

chai.use(chaiHttp);

/***** FUNCTIONS *****/
// Connection Task Test Methods
const commonsTasksTest = (url, status, message, done) => {
	chai.request(config.base_url_test).get(url).end((err, res) => {
		if(err) {
			console.log(err);
		} else {
			expect(res).to.have.status(status);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('response').be.eql(message);
            done();
		}
	});
}


/***** TESTS *****/
describe("Server is OK", () => {
    describe(`GET api/${config.version_test}/commons/`, () => {
        it("returns status 200 with an object and a correct message", (done) => {
            // Test function
            commonsTasksTest(`api/${config.version_test}/commons/`, 200, 'Serveur OK. API ready !', done);
        });

    });

    describe(`GET api/${config.version_test}/commons/checkAuth/:token`, () => {
        it("returns status 200 with an object", (done) => {
			
            chai.request(config.base_url_test).get(`api/${config.version_test}/commons/checkAuth/${config.token_test}`).end((err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                }
            });
        });

    });
})