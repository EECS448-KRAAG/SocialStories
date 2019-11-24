process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

function createPost(done) {
    const data = {
        title: 'What is love?',
        content: "Baby don't hurt me, don't hurt me, no more.",
        tags: ['TestTag', 'AnotherOne']
    }

    chai.request(server)
    .post('/api/course/test101/post')
    .send(data)
    .end((err, res) => {
        res.should.have.status(201);
        done();
    });
}

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

        it("it should not create a duplicate class", (done) => {
            const course = { title: 'TEST101' };

            chai.request(server)
            .post('/api/course')
            .send(course)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
        });
    });

    describe('GET /api/course/search', () => {
        it('it should return the only exact matching course', (done) => {
            chai.request(server)
            .get('/api/course/search?course=test101')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                done();
            });
        });

        it('it should return no courses when no course matches', (done) => {
            chai.request(server)
            .get('/api/course/search?course=ABCDEFG')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.length(0);
                done();
            })
        });
    });    
});

describe('Posts', () => {
    describe('POST /api/course/test101/post', () => {
        it('it should create a post when the body is valid', (done) => {
            const data = {
                title: 'What is love?',
                content: "Baby don't hurt me, don't hurt me, no more.",
                tags: ['TestTag', 'AnotherOne']
            };
        
            chai.request(server)
            .post('/api/course/test101/post')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });

    describe('GET /api/course/test101/post', () => {
        it('it should return an array of all the posts for the course', (done) => {
            chai.request(server)
            .get('/api/course/test101/post')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length.greaterThan(0);
                res.body[0].title.should.equal('What is love?');
                res.body[0].content.should.equal("Baby don't hurt me, don't hurt me, no more.");
                res.body[0].should.have.property('tags');
                res.body[0].tags.should.be.a('array');
                res.body[0].tags.length.should.equal(2);
                res.body[0].tags[0].should.equal('TestTag');
                res.body[0].tags[1].should.equal('AnotherOne');
                done();
            });
        });
    });

    describe('DELETE /api/course/test101/post/post_id', () => {
        it('it should delete the given post', (done) => {
            chai.request(server)
            .get('/api/course/test101/post')
            .end((err, res) => {
                const post_id = res.body[0].id;
                chai.request(server)
                .delete(`/api/course/test101/post/${post_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });

        it('it should fail to delete a non-existent post', (done) => {
            chai.request(server)
            .delete('/api/course/test101/post/abcdefg')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });
    })

    // describe('PUT /api/course/test101/post_id/flag', () => {
    //     it('it should successfully flag an un-flagged post', (done) => {
    //         createCourse(() => {
    //             chai.request(server)
    //             .get('/api/course/test101/post')
    //             .end((err, res) => {
    //                 const post_id = res.body[0].id;
    //                 console.log(post_id);
    //                 chai.request(server)
    //                 .put(`/api/course/test101/post/${post_id}/flag`)
    //                 .send({flagged: "true"})
    //                 .end((err, res) => {
    //                     console.log(res);
    //                     res.should.have.status(200);
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    // })

})
