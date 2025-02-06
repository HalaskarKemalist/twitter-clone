const router = require('express').Router()

// router.get('/', (req, res) => {
//     res.render('index')
// })
/*
router.get(
    '/user/:userId/tweets/:tweetId',
    ensureUser,
    rateLimiter({ keys: 'session.id' }),
    async (req, res, next) => {
      const { id: sessionId, userId, computerId } = req.session
      const userIds = await fetchUserIdsBySingularities({
        sessionId,
        userId,
        computerId
      })

      res.send(Event.decorateForUser(req.event, userIds))
    }
) */

/* router.get('/tweets', ensureUser, eventRateLimiter, async (req, res, next) => {
    const code = sanitize(req.query.code)
    if (!code) return next({ status: 400 })

    let query = { code: new RegExp(`^${code}$`, 'i') }

    if (ObjectId.isValid(code)) {
      query = { _id: code }
    }

    const event = await Event.findOne(query)

    if (!event) return res.send(null)

    res.send(event._id)
  })
 */
  // const eventsValidator = celebrate(
  //   {
  //     [Segments.BODY]: Joi.object().keys({
  //       title: Joi.string()
  //         .required()
  //         .min(3)
  //         .max(80)
  //         .trim()
  //         .replace(/(\s)\1*/g, '$1')
  //         .label('Title'),
  //       code: Joi.string()
  //         .trim()
  //         .min(3)
  //         .max(8)
  //         .replace(/(\s+)/g, '$1')
  //         .label('Code')
  //         .pattern(/^[a-z0-9]+$/),
  //       description: Joi.string()
  //         .allow('')
  //         .trim()
  //         .max(280)
  //         .replace(/(\s+)/g, '$1')
  //         .label('Description')
  //     })
  //   },
  //   {
  //     messages: {
  //       'string.pattern.base':
  //         'Event code can only include lowercase letters and numbers.'
  //     }
  //   }
  // ) // tweet'leri al
/*
router.get(
    '/users/:userId',
    ensureUser,
    rateLimiter({ keys: 'session.id' }),
    async (req, res, next) => {
      const { id: sessionId, userId, computerId } = req.session
      const userIds = await fetchUserIdsBySingularities({
        sessionId,
        userId,
        computerId
      })

      res.send(Event.decorateForUser(req.event, userIds))
    }
) // user'ı al !!!! AMA BUNU ACCOUNT YAPIYO
 */
// const tweetsValidator = celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       text: Joi.string()
//         .required()
//         .min(5)
//         .max(280)
//         .trim()
//         .replace(/(\s)\1*/g, '$1')
//         .label('Question'),
//       user: Joi.string().allow('').trim().replace(/(\s+)/g, '$1')
//     })
// })
/*
router.post(
    '/users/:userId/tweets',
    ensureUser,
    questionsValidator,
    rateLimiter({
      id: 'post-tweets',
      points: 1,
      duration: 1 * 60,
      keys: 'session.id'
    }),
    async function (req, res, next) {
      await Event.findByIdAndUpdate(req.params.eventId, {
        $push: {
          questions: {
            text: req.body.text,
            author: req.body.user || undefined,
            user: req.session.userId
          }
        }
      })

      socketServer().to(req.params.eventId).emit('questions updated')

      res.send(true)
    }
) // tweet at

router.delete(
    '/users/:userId/tweets/:tweetId',
    ensureUser,
    rateLimiter({ points: 1, duration: 1 * 60, keys: 'session.id' }),
    async function (req, res, next) {
      const { id: sessionId, userId, computerId } = req.session
      const userIds = await fetchUserIdsBySingularities({
        sessionId,
        userId,
        computerId
      })

      const question = req.event.questions.find(
        (q) =>
          userIds.some((i) => i.equals(q.user)) &&
          q._id.equals(req.params.questionId)
      )

      if (!question) return next({ status: 404 })

      await Event.findByIdAndUpdate(req.params.eventId, {
        $pull: {
          questions: { _id: question._id }
        }
      })

      socketServer().to(req.params.eventId).emit('questions updated')

      res.sendStatus(200)
    }
) // tweet sil

router.patch(
    '/users/:userId/tweets/:tweetId',
    ensureLogin,
    rateLimiter({ keys: 'user._id' }),
    async function (req, res, next) {
      const allowedActions = [
        'like',
        'unlike',
        'pin',
        'unpin',
        'bookmark',
        'unbookmark',
        'retweet',
        'reply',
        'share',
        'more'
      ]

      const { id: sessionId, userId, computerId } = req.session
      const { questionId } = req.params
      const { action } = req.body

      if (action === 'like' && !req.user && computerId.startsWith('nobiri-'))
        return next({ status: 401 })

      if (!allowedActions.includes(action)) return next({ status: 400 })

      const userIds = await fetchUserIdsBySingularities({
        sessionId,
        userId,
        computerId
      })

      let arrayFilters = []
      let update = {}

      switch (action) {
        case 'like':
          arrayFilters = [
            { 'question._id': questionId, 'question.voters': { $nin: userIds } }
          ]
          update = {
            $addToSet: {
              'questions.$[question].voters': userId
            }
          }
          break

        case 'unlike':
          arrayFilters = [
            { 'question._id': questionId, 'question.voters': { $in: userIds } }
          ]
          update = {
            $pullAll: {
              'questions.$[question].voters': userIds
            }
          }
          break

        case 'pin':
        case 'unpin':
          arrayFilters = [
            { 'question._id': questionId, 'question.state': { $ne: 'archived' } }
          ]

          update = {
            $set: {
              'questions.$[question].state':
                action === 'pin' ? 'pinned' : 'visible'
            }
          }
          break

        case 'archive':
          arrayFilters = [
            { 'question._id': questionId, 'question.state': { $ne: 'archived' } }
          ]

          update = {
            $set: {
              'questions.$[question].state': 'archived'
            }
          }
          break
        case 'unarchive':
          arrayFilters = [
            { 'question._id': questionId, 'question.state': 'archived' }
          ]

          update = {
            $set: {
              'questions.$[question].state': 'visible'
            }
          }
          break
      }

      const event = await Event.findOneAndUpdate(
        {
          _id: req.params.eventId
        },
        update,
        {
          new: true,
          arrayFilters
        }
      )

      if (!event) return next(new Error('Event or question not found'))

      socketServer()
        .to(req.params.eventId)
        .emit(
          req.user.equals(event.owner)
            ? 'questions updated by admin'
            : 'questions updated'
        )

      res.sendStatus(200)
    }
) // tweet'e hareket yap
module.exports = router */
module.exports = router