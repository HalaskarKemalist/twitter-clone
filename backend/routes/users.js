const { userService } = require('../services/user-service')
const router = require('express').Router()

router.get('/', async (req, res) => {
    res.send(await userService.load())
})

module.exports = router;