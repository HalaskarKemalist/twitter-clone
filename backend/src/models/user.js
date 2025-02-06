const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema  ({
    name: {
        type: String,
        minlength: 2,
        maxlength: 64,
        default: ''
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
    header: {
        type: String,
        default: 'https://picsum.photos/seed/picsum/750/250',
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
        ref: 'Tweet'
    }],

},
{ timestamps: true }
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'handle'
})

userSchema.plugin(autopopulate);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);