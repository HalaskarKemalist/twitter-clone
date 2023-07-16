const BaseDatabase = require('./base-database')
const Tweet = require('../models/tweet')

class TweetDatabase extends BaseDatabase {

}

module.exports = new TweetDatabase(Tweet)