const colors = require('colors')

const User = require('./user')
const Tweet = require('./tweet')

function printFollowUp(follow_up) {
    console.log(`${colors.bgBlue.white(follow_up.user.name)} followed ${colors.bgBlue.white(follow_up.followedUser.name)}`)
}

function printFollowUpHistory(user) {
    user.follow_ups.forEach(printFollowUp)
}

function printTweet(tweet) {
    console.log(`${colors.magenta(tweet.id)}`)
}

function printUserTweets(user) {
    console.log(`${colors.bgBlue.white(user.name)}'s tweets:\n`)
    user.tweets.forEach(printTweet)
}

const kegri = new User('Kegri')
const kaan = new User('Kaan')
const deniz = new User('Deniz')

const tweet1 = new Tweet('Tweet 1')
const tweet2 = new Tweet('Tweet 2')

kegri.toFollow(kaan)
deniz.toFollow(kaan)
kaan.toFollow(deniz)

kaan.toTweet(tweet1)
kaan.toTweet(tweet2)
deniz.toTweet(tweet2)

printFollowUpHistory(kaan)
console.log('\n')
printFollowUpHistory(deniz)

console.log('\n')
printUserTweets(kaan)
console.log('\n')
printUserTweets(deniz)