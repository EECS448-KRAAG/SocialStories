const express = require('express');
const router = express.Router();
const client = require('../utils/elastic-client');

router.get('/', async (req, res) => {
    const result = await client.search({
        index: 'course',
        body: {}
    });
    res.json(result.body.hits.hits.map(x => x['_source']));
});

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

router.get('/:course_id', async (req, res) => {
    const result = await client.search({
        index: req.params['course_id'].toLowerCase(),
        body: {}
    });
    res.json(result.body.hits.hits.map(x => x['_source']));
});

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
        console.log(valid_courses.body.hits.hits[0]['_source'].title.toLowerCase());
        const posts = await client.search({
            index: valid_courses.body.hits.hits[0]['_source'].title.toLowerCase(),
            body: {
                query: {
                    query_string: {
                        query: `*${req.query.title}*`,
                        fields: [
                            'title'
                        ]
                    }
                }
            }
        });
        res.json(posts.body.hits.hits.map(x => x['_source']));
    }
});




module.exports = router;