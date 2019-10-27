const express = require('express');
const router = express.Router();
const client = require('../utils/elastic-client');
const uuid = require('uuid');

// Get list of all courses
router.get('/', async (req, res) => {
    const result = await client.search({
        index: 'course',
        body: {}
    });
    res.json(result.body.hits.hits.map(x => x['_source']));
});

// Search for course by title
router.get('/search', async (req, res) => {
    const result = await client.search({
        index: 'course',
        body: {
            query: {
                query_string: {
                    query: `*${req.query.course}*`,
                    fields: [
                        'title'
                    ]
                }
            }
        }
    });

    res.json(result.body.hits.hits.map(x => x['_source']));
});

// Search for posts under a course
router.get('/:course_id/search', async (req, res) => {
    const valid_courses = await client.search({
        index: 'course',
        body: {
            query: {
                query_string: {
                    query: `*${req.params['course_id']}*`,
                    fields: [
                        'title'
                    ]
                }
            }
        }
    });

    if (valid_courses.body.hits.total.value == 0) {
        res.sendStatus(404);
    } else {
        const posts = await client.search({
            index: valid_courses.body.hits.hits[0]['_source'].title.toLowerCase(),
            body: {
                query: {
                    query_string: {
                        query: `*${req.query.title}*`,
                        fields: [
                            'title',
                            'content'
                        ]
                    }
                }
            }
        });
        res.json(posts.body.hits.hits.map(x => x['_source']));
    }
});

// Get all posts corresponding to a course
router.get('/:course_id/post', async (req, res) => {
    const response = await client.search({
        index: req.params['course_id'].toLowerCase(),
        body: {}
    });
    res.json(response.body.hits.hits.map(x => x['_source']));
});

// Create new post under a course
router.post('/:course_id/post', async (req, res) => {
    const id = uuid.v4();
    const response = await client.create({
        index: req.params['course_id'].toLowerCase(),
        type: '_doc',
        id: id,
        body: {
            title: req.body.title,
            content: req.body.content,
            id: id
        }
    });
    res.sendStatus(response.statusCode);
})

// Get course by id
router.get('/:course_id/post/:post_id', async (req, res) => {
    try {
        const response = await client.get({
            index: req.params['course_id'].toLowerCase(),
            type: '_doc',
            id: req.params['post_id']
        });
        res.json(response.body['_source']);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})


module.exports = router;