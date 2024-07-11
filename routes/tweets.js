const { tweetService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const tweets = await tweetService.load().sort('-createdAt')

    res.render('tweets', { tweets })
})

router.get('/:tweetId', async (req, res) => {
    const tweet = await tweetService.find(req.params.tweetId)
    if (!tweet) return res.status('404').send('Cannot find tweet')
    res.render('tweet', { tweet })
})

router.post('/', async (req, res) => {
    const tweet = await tweetService.insert(req.body)

    res.send(tweet)
})

router.delete('/:tweetId', async (req, res) => {
    await tweetService.removeBy('_id', req.params.tweetId)

    res.send('OK')
})

router.patch('/:tweetId', async (req, res) => {
    const { tweetId } = req.params
    const { body } = req.body

    await tweetService.update(tweetId, { body })
})

router.get('/search', async (req, res) => {
    const author = req.query.author

    const tweets = await tweetService.query(author)

    res.render('tweets', {tweets})
})


module.exports = router;