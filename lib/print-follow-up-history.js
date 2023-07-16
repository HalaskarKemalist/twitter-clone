const colors = require('colors')

function printFollowUp(follow_up) {
    console.log(`${colors.bgBlue.white(follow_up.user.name)} followed ${colors.bgBlue.white(follow_up.followedUser.name)}`)
}

function printFollowUpHistory(user) {
    if (user.follow_ups.length == 0)
        return console.log(`${colors.bgBlue.white(user.name)} has no following or follower yet.`)

    user.follow_ups.forEach(printFollowUp)
}

module.exports = printFollowUpHistory