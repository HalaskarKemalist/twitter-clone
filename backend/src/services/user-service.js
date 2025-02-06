const BaseService = require('./base-service');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const tweetService = require('./tweet-service');

class UserService extends BaseService {
    async findByName(name) {
        return this.findBy('name', name);
    }

    async follow(userId, user2Id) {
        const user = await this.find(userId);
        const user2 = await this.find(user2Id);

        if (!user.following.includes(user2._id)) {
            user.following.push(user2._id);
            user2.followers.push(user._id);

            await user.save();
            await user2.save();

            return user.following;
        }
    }

    async tweet(userId, tweetData) {
        const user = await this.find(userId);
        const tweet = tweetService.insert({ ...tweetData, author: user._id });

        await user.save()
        await tweet.save();
        return tweet;
    }

    async like(userId, tweetId) {
        const user = await this.find(userId);
        const tweet = await Tweet.findById(tweetId);

        if (!user.likedTweets.includes(tweet._id)) {
            user.likedTweets.push(tweet._id);
            tweet.likes.push(user._id);
        }

        await user.save();
        await tweet.save();
    }

    async retweet(userId, tweetId) {
        const user = await this.find(userId);
        const originalTweet = await tweetService.findById(tweetId);

        const retweet = tweetService.insert({
            author: user._id,
            body: originalTweet.body,
            originalTweet: originalTweet._id,
        });


        originalTweet.retweets.push(retweet._id);

        await user.save();
        await retweet.save();
        await originalTweet.save();
        return retweet;
    }
}

module.exports = new UserService(User);