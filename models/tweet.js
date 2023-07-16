const uuid = require('uuid')

class Tweet {
    constructor(id = uuid.v4(), text = "", like = 0) {
        this.id = id
        
        this.text = text
        this.like = like
    }

    static create({id, text, like}) {
        return new Tweet(id, text, like)
    }
}

module.exports = Tweet