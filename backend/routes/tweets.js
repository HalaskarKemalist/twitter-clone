const { tweetService } = require('../services/tweet-service')
const { userService } = require('../services/user-service')
// const passport = require('passport')
const router = require('express').Router()
const ensureAuthenticated = require('../middleware/ensure-authenticated')
const Tweet = require('../models/tweet')
const User = require('../models/user')

router.post('/:userHandle', async (req, res) => {
    try {
        console.log('reached router')
        console.log('userHandle:', req.params.userHandle)
        console.log('content:', req.body.content)
        const userHandle = req.params.userHandle
        const body = req.body.content

        const user = await User.findOne({ handle: userHandle })
        console.log('user:', user)
        if (!user) return res.status(404).send('User not found')

        // if (req.user._id.toString() !== user._id.toString()) {
        //     return res.status(403).send('Forbidden');
        // }

        const tweet = new Tweet({
            body,
            author: user._id,
            createdAt: new Date()
        })

        await tweet.save()
        res.status(201).send(tweet)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

router.get('/:userHandle/:tweetId', ensureAuthenticated, async (req, res) => {
    try {
        const { tweetId } = req.params

        const tweet = await Tweet.findById(tweetId).populate('author', 'name handle')
        if (!tweet) return res.status(404).send('Tweet not found')

        res.status(200).send(tweet)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

router.get('/:userHandle/', ensureAuthenticated, async (req, res) => {
    try {
        const { userHandle } = req.params;

        const user = await User.findOne({ handle: userHandle });
        if (!user) return res.status(404).send('User not found');

        const tweets = await Tweet.find({ author: user._id }).populate('author', 'name handle');
        res.status(200).send(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.delete('/:userHandle/:tweetId', ensureAuthenticated, async (req, res) => {
    try {
        const { tweetId } = req.params;

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).send('Tweet not found');

        if (req.user._id.toString() !== tweet.author.toString()) {
            return res.status(403).send('Forbidden');
        }

        await Tweet.deleteOne({ _id: tweetId });
        res.status(200).send('Tweet deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.patch('/:userHandle/:tweetId', ensureAuthenticated, async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { body, attachments } = req.body;

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).send('Tweet not found');

        if (req.user._id.toString() !== tweet.author.toString()) {
            return res.status(403).send('Forbidden');
        }

        const updatedTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            { body, attachments },
            { new: true }
        ).populate('author', 'name handle');

        res.status(200).send(updatedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;

/* router.get('/', async (req, res) => {
    res.send(await tweetService.load().sort('-createdAt'))
})

router.get('/:tweetId', async (req, res) => {
    const tweet = await tweetService.find(req.params.tweetId)
    if (!tweet) return res.status('404').send('Cannot find tweet')
    res.render('tweet', { tweet })
})

router.post('/', async (req, res) => {
    const tweet = await tweetService.insert(req.body)
    console.log("author: ", req.params.author, "body:", req.params.body)

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
}) */