const colors = require('colors')

function printTweet(tweet) {
    console.log(`${colors.magenta(tweet.id+" "+tweet.text)}`)
}

function printUserTweets(user) {
    if (user.tweets.length == 0)
        return console.log(`${colors.bgBlue.white(user.name)} has no tweet yet.`)

    console.log(`${colors.bgBlue.white(user.name)}'s tweets:\n`)
    user.tweets.forEach(printTweet)
}

module.exports = printUserTweets