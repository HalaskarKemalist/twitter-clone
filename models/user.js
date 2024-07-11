const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const userSchema = new mongoose.Schema  ({
    name: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 },
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 },
    }],
    likedTweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
    }],
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    
},
{ timestamps: true }
);

userSchema.plugin(autopopulate);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
//module.exports = mongoose.model('User', userSchema)