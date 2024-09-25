const app = require('../..')
const request = require('supertest')(app)

test.skip('allows following', async () => {
    const user1ToCreate = {
        name: 'Test user 1',
        handle: 'testuser1',
        email: 'testuser1@nimble.dev'
    }

    const user2ToCreate = {
        name: 'Test user 2',
        handle: 'testuser2',
        email: 'testuser2@nimble.dev'
    }

    const user1Response = await request
        .post('/users')
        .send(user1ToCreate)
        .expect(200)

    const user2Response = await request
        .post('/users')
        .send(user2ToCreate)
        .expect(200)

    const followingResponse = await request
        .post(`/users/${user1Response.body.__id}/following`)
        .send({
            user2Id: user2Response.body.__id
        })
        .expect(200)

    const followingCreated = followingResponse.body

    expect(followingCreated.following).toContain(user2Response.body.__id)
})