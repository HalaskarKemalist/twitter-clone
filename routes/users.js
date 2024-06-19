const { userDatabase } = require('../database')
const flatted = require('flatted')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const users = await userDatabase.load()
    //res.send(flatted.stringify(users))

    res.render('users', { users })  
})

router.post('/', async (req, res) => {
    const user = await userDatabase.insert(req.body)

    res.send(user)
})

router.delete('/:userId', async (req, res) => {
    await userDatabase.removeBy('id', req.params.userId)

    res.send('OK')
})

router.get('/:userId', async (req, res) => {
    const user = await userDatabase.find(req.params.userId)
    if (!user) return res.status('404').send('Cannot find user')
    res.render('user', { user })
})

router.post('/:userId/following', async (req, res) => {
    
    const { userId } = req.params
    const { user2Id } = req.body

    const user = await userDatabase.find(userId)
    const user2 = await userDatabase.find(user2Id)

    user.toFollow(user2)

    await userDatabase.update(user)
    await userDatabase.update(user2)

    res.send('OK')
})

module.exports = router