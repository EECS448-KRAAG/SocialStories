/**
 * Route manager for users.
 * @module routes/users
 * @requires express
 * @requires uuid
 * @requires module:elastic-client
 */

const express = require("express");
const router = express.Router();
const client = require("../utils/elastic-client");


/**
 * Get list of all users
 * @name (GET) '/api/user/'
 * @memberof module:routes/users
 * @function
 * @returns All users
 */
router.get('/', async (req, res) => {
    const response = await client.search({
        index: 'permission',
        body: {}
    });
    res.json(response.body.hits.hits.map(x => x['_source']));
})

/**
 * Set new users permission level or get existing user permission level
 * @name (GET) '/api/user/:user_id:/permission'
 * @memberof module:routes/users
 * @function
 * @param user_id {Get-Query-Param} User id from Google API
 * @returns User permission level (0 is none, 1 is Instructor, 2 is Admin)
 */
router.get('/:user_id/permission', async (req, res) => {
    const existing_users = await client.search({
        index: 'permission',
        body: {
            query: {
                match: {
                    user_id: req.params['user_id']
                }
            }
        }
    });
    if (existing_users.body.hits.hits.length === 1) {
        const user_permission = existing_users.body.hits.hits[0]['_source'].permission;
        res.json({permission: user_permission});
    } else {
        await client.create({
            index: 'permission',
            id: req.params['user_id'],
            body: {
                user_id: req.params['user_id'],
                name: req.query.name,
                permission: 0,
                courses: []
            }
        });
        res.json({permission: 0});
    }
});


/**
 * Update user's permission level
 * @name (PUT) '/api/user/:user_id/permission'
 * @memberof module:routes/users
 * @function
 * @param user_id {Get-Query-Param} User id from Google API (of an existing user)
 * @param level {PUT-Body} Number to set the level of an existing user
 */
router.put('/:user_id/permission', async (req, res) => {
    try {
        await client.update({
            index: 'permission',
            id: req.params['user_id'],
            body: {
                doc: {
                    permission: req.body.level
                }
            }
        });
        res.sendStatus(202);
    } catch(e) {
        console.error(e);
        res.sendStatus(404);
    }
});

/**
 * Update list of courses for a user
 * @name (PUT) '/api/user/:user_id/course
 * @memberof module:routes/users
 * @function
 * @param user_id {Get-Query-Param} User id from Google API
 * @param course {PUT-Body} Object with course property of new course to add to user
 * @return None
 */
router.put('/:user_id/course', async (req, res) => {
    const userResponse = await client.get({
        index: 'permission',
        id: req.params['user_id']
    });
    const courses = [req.body.course];
    if (userResponse.body['_source'].courses) {
        userResponse.body['_source'].courses.map(x => courses.push(x));
    }

    await client.update({
        index: 'permission',
        id: req.params['user_id'],
        body: {
            doc: {
                courses: courses
            }
        }
    });
    res.sendStatus(200);
});

module.exports = router;
