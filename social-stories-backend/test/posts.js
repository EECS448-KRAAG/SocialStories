process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('Courses', () => {
    describe('POST /api/course/', () => {
        it("it should create a class as long as the 'title' field is set", (done) => {
            const course = { title: 'TEST101' };

            chai.request(server)
            .post('/api/course')
            .send(course)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });
});
