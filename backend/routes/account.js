const { userService } = require('../services')

const router = require('express').Router()
const passport = require('passport')
// const Validator = require('async-validator').default

// const rateLimiter = require('../lib/rate-limiter')
const User = require('../models/user')

function ensureLogin(req, res, next) {
    if (req.user) return next()

    next(new Error('Unauthorized'))
}

router.get('/', async (req, res) => {
        console.log(req.user)
        res.send(req.user)
    }
)

router.patch('/update-profile', ensureLogin, async (req, res, next) => {
    const { name, profilePicture, bio, location, website } = req.body

    const user = await User.findById(req.user._id)

    if (name) user.name = name
    if (profilePicture) user.profilePicture = profilePicture
    if (bio) user.bio = bio
    if (location) user.location = location
    if (website) user.website = website

    await user.save()

    return res.status(200).json({ user })
})

/* router.patch('/', async (req, res, next) => {
    if (!req.user) return next({ status: 400})

    const { director } = req.body

    if (!director) res.sendStatus(400)

    await userService.update(req.user._id, { director })

    res.sendStatus(204)
}) */

/* router.post('/register', rateLimiter({ points: 5, duration: 30 * 60}), async (req, res, next) => {
    const descriptor = {
        name: [
            { required: true, message: 'Your name is required.\n' },
            { min: 2, message: 'Name should have a minimum length of 2 characters.\n' },
            { max: 64, message: 'Name should have a maximum length of 64 characters.\n' }
        ],
        password: [
            { required: true, message: 'Password is required.\n' },
            { min: 8, message: 'Password should have a minimum length of 8 characters.\n' },
            { pattern: /[a-zA-Z]/, message: 'Password should include at least one letter.\n' },
            { pattern: /\d/, message: 'Password should include at least one digit.\n' },
            { pattern: /[\W_]/, message: 'Password should include at least one symbol.\n' },
            { pattern: /^\S+$/, message: 'Password should not include spaces.\n' }
        ],
        passwordConfirmation: [
            { required: true, message: 'Password confirmation is required.\n' },
            {
                validator(rule, value, callback, source) {
                    return (
                        source.password === value || new Error('The passwords you entered are inconsistent.\n')
                    )
                }
            }
        ],
        email: [
            { type: 'email', message: 'E-mail is not valid.\n' },
            { required: true, message: 'E-mail is required.\n' }
        ]
    }

    const validator = new Validator(descriptor)
    try {
        await validator.validate(req.body.user)
    } catch ({ errors }) {
        return next({ message: errors.map((e) => e.message).join('') })
    }

    try {
        const createdUser = new User(req.body.user)

        const user = await User.register(createdUser, req.body.user.password)

        // Don't await, so the registration won't depend on email sending.
        createdUser.sendVerificationEmail()

        req.session.userId = user._id
        req.session.save()

        res.sendStatus(200)
    } catch (e) {
        return next(e)
    }
}) */

/* router.get('/email-verification', rateLimiter({ points: 5, duration: 15 * 60 }), async (req, res, next) => {
    if (!req.query.token) return next({ status: 400 })

    try {
        await userService.verifyEmailByToken(req.query.token)
    } catch (e) {
        return res.redirect(`${process.env.FRONTEND.BASE_PATH}/login?verifyFail=1`)
    }

    res.redirect(`${process.env.FRONTEND.BASE_PATH}/login?verifySuccess=1`)
}) */

/* router.post('/outgoing-verification-emails',
    rateLimiter({ points: 1, duration: 2 * 60, message: 'You can only attempt to send email once every 2 minutes.'}),
    async (req, res, next) => {
        if (!req.body.email) return next({ status: 400 })

        const user = await User.findOne({
            email: req.body.email,
            isVerified: false
        })

        if (!user) return next({ status: 422 })

        await user.sendVerificationEmail()

        res.sendStatus(200)
    } ) */

/* const preventLoginForLoggedInUsers = (req, res, next) => {
    next(req.user && new Error('User is already logged in'))
} */

/* const isEmailVerified = async (req, res, next) => {
    const isVerified = await User.exists({
        email: req.body.email,
        isVerified: true
    })

    if (!isVerified) {
        return res.status(403).send({
        type: 'verification-required',
        email: req.body.email,
        message: 'Please make sure you have verified your email.'
        })
    }

    next()
  } */

/* router.post('/session', rateLimiter({ points: 10, duration: 30 * 60 }),
  preventLoginForLoggedInUsers,
  isEmailVerified,
  regenerateSessionMiddleware,
  passport.authenticate('local', { failWithError: true }),
  async (req, res) => {
    res.send(req.user)
  },
  (err, req, res, next) => {
    if (err.status !== 401) return next(err)

    next(new Error('The username and password you provided did not match our records. Please double-check and try again.'))
  }
) */

/* router.delete('/session', rateLimiter({ points: 50, duration: 10 * 60 }), async (req, res, next) => {

    await req.logout()

    req.session.regenerate((err) => {
    if (err) return next(err)

    res.sendStatus(200)
    })
  }
) */

/* router.patch('/me', async (req, res, next) => {
  if (!req.user) return next({ status: 400 })

  const { name, currentPassword, newPassword } = req.body

  if (currentPassword && newPassword)
    await req.user.changePassword(currentPassword, newPassword)

  if (name) await userService.update(req.user._id, { name })

  res.sendStatus(200)
}) */
// ---------------------------------
/* router.get('/', async (req, res) => {
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
}) */

module.exports = router;