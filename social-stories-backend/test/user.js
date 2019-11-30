process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
    describe('GET /api/user/user_id/permission', () => {
        it('it should add a permission 0 to a new user', (done) => {
            chai.request(server)
            .get('/api/user/1234/permission')
            .end((err, res) => {
                res.should.status(200);
                res.body.should.have.property('permission');
                res.body.permission.should.equal(0);
                done();
            });
        });
    });

    describe('PUT /api/user/user_id/permission', () => {
        before(() => {
            chai.request(server)
            .get('/api/user/24/permission')
            .end();
        });
        it('it should change user permissions for a given user', (done) => {
            chai.request(server)
            .put('/api/user/24/permission')
            .send({level: 2})
            .end((err, res) => {
                res.should.have.status(202);
                done();
            });
        });

        it('it should have newly changed user permission status changed', (done) => {
            setTimeout(() => {
                chai.request(server)
                .get('/api/user/24/permission')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('permission');
                    res.body.permission.should.equal(2);
                    done();
                });
            }, 1000)
        }).timeout(10000);
    });
});