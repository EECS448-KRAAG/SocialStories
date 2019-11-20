/**
 * Route manager for courses.
 * @module routes/courses
 * @requires express
 * @requires uuid
 * @requires module:elastic-client
 */

const express = require('express');
const router = express.Router();
const client = require('../utils/elastic-client');
const uuid = require('uuid');

/**
 * Get all courses
 * @name (GET) '/api/course/'
 * @memberof module:routes/courses
 * @function
 * @returns All courses
*/
router.get('/', async (req, res) => {
    const result = await client.search({
        index: 'course',
        body: {}
    });
    res.json(result.body.hits.hits.map(x => x['_source']));
});

/**
 * Create new Course
 * @name (POST) '/api/course'
 * @memberof module:routes/courses
 * @function
 * @param course {POST-Body} Post object with 'title' corresponding to the name of the new course
 */
router.post('/', async (req, res) => {
    const id = uuid.v4();
    const course_title = req.body.title.toLowerCase();

    const existing_courses = await client.search({
        index: 'course',
        body: {
            query: {
                term: {
                    "title": course_title
                }
            }
        }
    });

    if (existing_courses.body.hits.hits.length !== 0 ) {
        res.sendStatus(409);
    } else {
        await client.indices.create({
            index: course_title
        });
        await client.create({
            index: "course",
            type: '_doc',
            id: id,
            body: {
                title: course_title,
                id: id
            }
        });
        res.sendStatus(201);
    }
})

/**
 * Search for a course by title
 * @name (GET) '/api/course/search'
 * @memberof module:routes/courses
 * @function
 * @param course {GET-Parameter} Object with 'course' set to the query string
 * @returns All courses matching search query
 */
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

/**
 * Search for a post under a course
 * @name (GET) '/api/course/:course_id:/search'
 * @memberof module:routes/courses
 * @function
 * @param course_id {Route-parameter} The name of the course to search under
 * @param body {GET-Query-parameter} Object with 'content' field set to the query string
 * @returns All posts under a course matching the given query string
 */
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
                        query: `*${req.query.content}*`,
                        fields: [
                            'title',
                            'content',
                            'tags'
                        ]
                    }
                }
            }
        });
        res.json(posts.body.hits.hits.map(x => x['_source']));
    }
});

/**
 * Get all posts under a course
 * @name (GET) '/api/course/:course_id:/post'
 * @memberof module:routes/courses
 * @function
 * @param course_id {Route-parameter} The name of the course to get courses for
 * @returns All posts under a given course
 */
router.get('/:course_id/post', async (req, res) => {
    const response = await client.search({
        index: req.params['course_id'].toLowerCase(),
        body: {}
    });
    res.json(response.body.hits.hits.map(x => x['_source']));
});

/**
 * Create new post under a course
 * @name (POST) '/api/course/:course_id:/post'
 * @memberof module:routes/courses
 * @function
 * @param course_id {Route-parameter} The name of the course to add a post to
 * @param Body {POST-Body} Post object with a 'title' and 'content' field
 * @returns Status code of success of creating post
 */
router.post('/:course_id/post', async (req, res) => {
    const id = uuid.v4();
    const response = await client.create({
        index: req.params['course_id'].toLowerCase(),
        type: '_doc',
        id: id,
        body: {
            title: req.body.title,
            content: req.body.content,
            id: id,
            tags: req.body.tags
        }
    });
    res.sendStatus(response.statusCode);
})

/**
 * Gets specific post under a course
 * @name (GET) '/api/course/:course_id:/post/:post_id:'
 * @memberof module:routes/courses
 * @function
 * @param course_id {Route-parameter} The name of the course
 * @param post_id {Route-parameter} The id of the post to get
 * @returns Post under a course with given id
 */
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
});

/**
 * Delete specific post in specific course
 * @name (DELETE) '/api/course/:course_id/post/:post_id
 * @memberof module:routes/courses
 * @function
 * @param course_id {Route-parameter} The name of the course
 * @param post_id {Route-parameter} The id of the post to get
 * @returns None.
 */
router.delete('/:course_id/post/:post_id', async (req, res) => {
    try {
        const response = await client.delete({
            index: req.params['course_id'].toLowerCase(),
            id: req.params['post_id']
        });
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(404);
    }
});

module.exports = router;