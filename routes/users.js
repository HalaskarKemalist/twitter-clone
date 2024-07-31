const { userService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    res.send(await userService.load())
})

router.get('/:userId', async (req, res) => {
    const user = await userService.find(req.params.userId)

    if (!user) return res.status('404')
    res.send(user)
})

router.post('/', async (req, res) => {
    const user = await userService.insert(req.body)

    res.send(user)
})

router.delete('/:userId', async (req, res) => {
    await userService.removeBy('_id', req.params.userId)

    res.send('OK')
})

router.patch('/:userId', async (req, res) => {
    const { userId } = req.params
    const { name } = req.body

    await userService.update(userId, { name })
})

router.post('/:userId/following', async (req, res) => {
    
    const { userId } = req.params
    const { user2Id } = req.body

    // const user = await userService.find(userId)
    // const user2 = await userService.find(user2Id)

    const result = await userService.follow(userId, user2Id)
    // await userService.update(user)
    // await userService.update(user2)

    res.send(result)
})

module.exports = router;