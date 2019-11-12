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
			// console.log(res);
			expect(res).to.have.status(status);
			expect(res.body).to.be.a('object');
			
		}
	});
}

/***** TESTS *****/
describe("Messages tasks", () => {

	describe(`Success with /GET api/${config.version_test}/messages/`, () => {
		
		it('should add one message and return message object', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			const datas = {
				title: "My title",
				content: "My big content of message",
				category: "Thought",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).post(`api/${config.version_test}/messages`).send(datas).end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					done();
				}
			});
		});

		it('should get all user\'s messages in object', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).get(`api/${config.version_test}/messages`).end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					done();
				}
			});
		});

		it('should get all DB messages in object', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).get(`api/${config.version_test}/messages/all`).end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					done();
				}
			});
		});

		it('should get one message in object', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).get(`api/${config.version_test}/messages/1`).end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					done();
				}
			});
		});

		
		it('should modify one message and return true', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			const datas = {
				title: "My title",
				content: "My big content of message with modifications",
				category: "Faith",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).put(`api/${config.version_test}/messages/1`).send(datas).end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					done();
				}
			});
		});

		it('should delete one message and return true', (done) => {
			const params = {
				login: "JDoe",
				password: "JDoe1",
				email: "john.doe@test.co",
				creationDate: commonUtils.newDate(),
			}

			connectionTasksTest(`api/${config.version_test}/users/signin`, params, 200, done);
			chai.request(config.base_url_test).delete(`api/${config.version_test}/messages/1`).end((err, res) => {
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

});