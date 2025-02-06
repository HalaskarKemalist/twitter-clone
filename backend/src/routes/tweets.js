const { tweetService } = require('../services/tweet-service')
const { userService } = require('../services/user-service')
// const passport = require('passport')
const router = require('express').Router()
const ensureAuthenticated = require('../middleware/ensure-authenticated')
const Tweet = require('../models/tweet')
const User = require('../models/user')

router.get('/:userHandle', async (req, res) => {
    const { page = 1, limit = 10 } = req.query

    try {
        const totalTweets = await Tweet.countDocuments({ userHandle: req.params.userHandle })
        const tweets = await Tweet.find({ userHandle: req.params.userHandle})
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        res.json({ tweets, total: totalTweets })
    } catch (err) {
        res.status(500).json({ error: 'Failed to load tweets' })
    }
})

router.get('/following', async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const loggedInUserId = req.user._id

    try {
        const user = await User.findById(loggedInUserId).populate('following')
        const followingIds = user.following.map(followedUser => followedUser._id)

        const totalTweets = await Tweet.countDocuments({ author: { $in: followingIds } })
        const tweets = await Tweet.find({ author: { $in: followingIds } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        res.json({ tweets, total: totalTweets })
    } catch (err) {
        res.status(500).json({ error: 'Failed to load tweets' })
    }
})


router.get('/for-you', async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const loggedInUserId = req.user._id

    try {
        const user = await User.findById(loggedInUserId).populate('likes').populate('retweets')

        const engagedTweetIds = [...user.likes, ...user.retweets].map(tweet => tweet._id)

        const relatedTweets = await Tweet.find({ _id: { $in: engagedTweetIds } })
            .sort({ likes: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        // Fetch globally or network-wide trending tweets (based on retweets, likes)
        const trendingTweets = await Tweet.find({})
            .sort({ retweets: -1, likes: -1 }) // Sort by most retweeted/liked
            .skip((page - 1) * limit)
            .limit(limit)

        const forYouTweets = [...relatedTweets, ...trendingTweets].slice(0, limit)

        res.json({ tweets: forYouTweets })
    } catch (err) {
        res.status(500).json({ error: 'Failed to load tweets' })
    }
})

router.post('/:userHandle', async (req, res) => {
    try {
        // console.log('reached router')
        // console.log('userHandle:', req.params.userHandle)
        // console.log('content:', req.body.content)
        const userHandle = req.params.userHandle
        const body = req.body.content

        const user = await User.findOne({ handle: userHandle })
        // console.log('user:', user)
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

router.delete('/:userHandle/:tweetId', async (req, res) => {
    try {
        const { tweetId } = req.params;

        const tweet = await Tweet.findByIdAndDelete(tweetId);
        if (!tweet) return res.status(404).send('Tweet not found');

        // if (req.user._id.toString() !== tweet.author.toString()) {
        //     return res.status(403).send('Forbidden');
        // }

        res.status(200).send('Tweet deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.patch('/:userHandle/:tweetId', async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { newTweetBody } = req.body;

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).send('Tweet not found');

        // if (req.user._id.toString() !== tweet.author.toString()) {
        //     return res.status(403).send('Forbidden');
        // }

        const timeElapsed = Date.now() - new Date(tweet.createdAt);
        if (timeElapsed > 15 * 60 * 1000) {
            return res.status(403).send({ error: 'Editing period expired' });
        }

        tweet.body = newTweetBody
        await tweet.save()
        // const updatedTweet = await Tweet.findByIdAndUpdate(
        //     tweetId,
        //     { body, attachments },
        //     { new: true }
        // ).populate('author', 'name handle');

        res.status(200).send(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update tweet' });
    }
})

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