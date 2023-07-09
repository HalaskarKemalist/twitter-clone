class Tweet {
    constructor(id, text = "", like = 0) {
        this.id = id
        this.text = text
        this.like = like
    }
}

module.exports = Tweet