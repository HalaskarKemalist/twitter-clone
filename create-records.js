const User = require('./models/user')
const Tweet = require('./models/tweet')
const userDatabase = require('./database/user-database')
const tweetDatabase = require('./database/tweet-database')

const printFollowUpHistory = require('./lib/print-follow-up-history')
const printUserTweets = require('./lib/print-user-tweets')

const kegri = User.create({name: 'Kegri'})
const kaan = User.create({name: 'Kaan'})
const deniz = User.create({name: 'Deniz'})

const tweet1 = Tweet.create({text: 'Hi 1'})
const tweet2 = Tweet.create({text: 'Hi 2'})

kegri.toFollow(kaan)
deniz.toFollow(kaan)
kaan.toFollow(deniz)

kaan.toTweet(tweet1)
kaan.toTweet(tweet2)
deniz.toTweet(tweet2)

userDatabase.save([kaan, kegri, deniz])
tweetDatabase.save([tweet1, tweet2])

const tolga = User.create({name: 'Tolga'})

userDatabase.insert(tolga)

const users = userDatabase.load()

users.forEach(printFollowUpHistory)
users.forEach(printUserTweets)