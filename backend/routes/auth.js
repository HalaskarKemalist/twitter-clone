const express = require('express')
const passport = require('passport')
const { celebrate, Joi, Segments } = require('celebrate')

const User = require('../models/user')

const router = express.Router()

function ensureLogin(req, res, next) {
    if (req.user) return next()

    next(new Error('Unauthorized'))
}

router.get('/session', (req, res) => {
    res.send(req.user)
})

router.post('/register',
    celebrate({
        [Segments.BODY]: {
            handle: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.any().required()
        }
    }),
    async (req, res, next) => {
    const { handle, email, password } = req.body

    try {

        if (!handle || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const createdUser = new User({ handle, email })
        const user = await User.register(createdUser, password)

        res.send(user)
    } catch (e) {
        next(e)
    }
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
        res.send(req.user)
    }
)

router.delete('/session', ensureLogin, async (req, res, next) => {
        await req.logout()

        req.session.regenerate(err => {
            if (err) return next(err)

            return res.sendStatus(200)
        })
})

module.exports = router