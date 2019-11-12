const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../assets/config');

const commonUtils = require('../utils/commons.utils');

chai.use(chaiHttp);


/***** FUNCTIONS *****/
// Connection Task Test Methods
const connectionTasksTest = (url, params, status, done) => {
	chai.request(config.base_url_test).post(url).send(params).end((err, res) => {
		if(err) {
			console.log(err);
		} else {
			expect(res).to.have.status(status);
			expect(res.body).to.be.a('object');
			done();
		}
	});
}

/***** TESTS *****/
describe("User connection tasks", () => {

	describe(`Errors with /POST api/${config.version_test}/users/signup`, () => {
		
		it('should no post a user when "login" params is undefined', (done) => {
			const params = {
				password: "JDoe1",
				email: "john.doe@test.co",
				firstname: "John",
				lastname: "Doe",
				category: "Chanteur",
				country: "France",
			}

			connectionTasksTest(`api/${config.version_test}/users/signup`, params, 400, done);
		});
		
		it('should no post a user when "password" params is undefined', (done) => {
			const params = {
				login: "JDoe",
				email: "john.doe@test.co",
				firstname: "John",
				lastname: "Doe",
				category: "Chanteur",
				country: "France",
			}

			connectionTasksTest(`api/${config.version_test}/users/signup`, params, 400, done);
		});
		
		it('should no post a user when "email" params is undefined', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				firstname: "John",
				lastname: "Doe",
				category: "Chanteur",
				country: "France",
			}

			connectionTasksTest(`api/${config.version_test}/users/signup`, params, 400, done);
		});
		
	});

	describe(`Success with /POST api/${config.version_test}/users/signup`, () => {
		
		it('should post a user with a server response', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signup`, params, 200, done);
		});
	});

	describe(`Errors with /POST api/${config.version_test}/users/signin`, () => {
		it('should no post a user when "login" params is undefined', (done) => {
			const params = {
				password: "JDoe1",
				email: "john.doe@test.co",
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 400, done);
		});
		
		it('should no post a user when "password" params is undefined', (done) => {
			const params = {
				login: "JDoe",
				email: "john.doe@test.co",
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 400, done);
		});
		
		it('should no post a user when "email" params is undefined', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 400, done);
		});
	});

	describe(`Success with /POST api/${config.version_test}/users/signin`, () => {	
		it('should post a user with a server response', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
		});
	});

});