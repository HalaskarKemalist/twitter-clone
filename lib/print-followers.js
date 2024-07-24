const colors = require('colors')

function printFollower(follower) {
    console.log(`${colors.bgBlue.white(follower.name)}`)
}

function printFollowers(user) {
    if (user.followers.length == 0)
        return console.log(`${colors.bgBlue.white(user.name)} has no follower yet.`)

    user.followers.forEach(printFollower)
}

module.exports = printFollowers