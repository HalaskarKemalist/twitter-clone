const express = require('express')
const passport = require('passport')
const { celebrate, Joi, Segments } = require('celebrate')

const User = require('../models/user')
const ensureAuthenticated = require('../middleware/ensure-authenticated')

const router = express.Router()

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

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res, next) => {
        // Explicitly save the session to make sure it's persisted
        req.session.save((err) => {
            if (err) {
                return next(err)
            }
            // Send user info back after successful login
            res.status(200).json(req.user)
        })
    }
)

router.delete('/session', ensureAuthenticated, async (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }

            req.session.regenerate(err => {
                if (err) return next(err);

                return res.sendStatus(200);
            });
        });
        // await req.logout()

        // req.session.regenerate(err => {
        //     if (err) return next(err)

        //     return res.sendStatus(200)
        // })
})

module.exports = router