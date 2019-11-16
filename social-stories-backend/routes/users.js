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
 * @name (GET) '/api/user/:user_id:/permission'
 * @memberof module:routes/users
 * @function
 * @param user_d {Get-Query-Param} User id from Google API
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
                permission: 0
            }
        });
        res.json({permission: 0});
    }
});


/**
 * @name (PUT) '/api/user/:user_id/permission'
 * @memberof module:routes/users
 * @function
 * @param user_id {Get-Query-Param} User id from Google API (of an existing user)
 * @param level {PUT-Body} Number to set the level of an existing user
 */
router.put('/:user_id/permission', async (req, res) => {
    console.log(req.body);
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
