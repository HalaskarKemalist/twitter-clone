const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const tweetSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: 'name handle' },
    },
    body: {
        type: String,
        required() {
            return !this.originalTweet
        },
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        autopopulate: { select: 'author' }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'handle' }
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        autopopulate: { maxDepth: 1 }
    }],
    originalTweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        default: null,
        autopopulate: { maxDepth: 2 }
    },
    attachments: {
        type: [String],
        default: [],
    },
},
{ timestamps: true }
);

tweetSchema.plugin(autopopulate);

module.exports = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);