const FollowUp = require('./follow_up')

class User {
    constructor(name) {
        this.name = name
        this.tweets = []
        this.following = []
        this.follower = []
        this.follow_ups = []
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
}

module.exports = User