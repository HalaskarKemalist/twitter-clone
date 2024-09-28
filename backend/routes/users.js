const { userService } = require('../services/user-service')
const router = require('express').Router()
const User = require('../models/user')

// router.get('/', async (req, res) => {
//     res.send(await userService.load())
// })

router.get('/', async (req, res) => {
    const users = await User.find({})
    console.log("users:", users)

    res.send(users)
})

module.exports = router;