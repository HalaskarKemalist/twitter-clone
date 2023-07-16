const FollowUp = require('./follow_up')
const uuid = require('uuid')

class User {
    constructor(id = uuid.v4(), name = [], tweets = [], following = [], follower = [], follow_ups = []) {
        this.id = id

        this.name = name
        this.tweets = tweets
        this.following = following
        this.follower = follower
        this.follow_ups = follow_ups
    }

    toTweet(tweet) {
        this.tweets.push(tweet)
    }

    toFollow(followedUser) {
        const follow_up = new FollowUp(followedUser, this)
        this.following.push(followedUser)
        followedUser.follower.push(this)
        this.follow_ups.push(follow_up)
        followedUser.follow_ups.push(follow_up)

        return follow_up
    }

    static create({id, name, tweets, following, follower, follow_ups}) {
        return new User(id, name, tweets, following, follower, follow_ups)
    }
}

module.exports = User