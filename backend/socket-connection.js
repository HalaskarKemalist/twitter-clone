/* const io = require('socket.io')
const { tweetService } = require('./services')
const { tweet } = require('./services/user-service')
let socketServer = null


module.exports = async (app, server) => {
    const tweets = await tweetService.load().sort('-createdAt')
    // console.log(tweets)
    tweets.forEach(tweet => console.log(tweet.author.handle, " | ", tweet.body))
    // console.log('tweets array length: ', tweets.length)

    if (socketServer) return socketServer

    // socketServer = io(server)
    socketServer = new io.Server(server, {
        cors: {
            origin: "http://localhost:8080",
            credentials: true
        }
    })


    socketServer.on('connection', (socket) => {
        console.log('A user connected')

        // Emit existing tweets
        // console.log(tweets)
        socket.emit('tweets', tweets)

        // Emit new tweets in real-time
        socket.on('newTweet', (tweet) => {
            tweets.push(tweet)
            socketServer.emit('tweets', tweets) // Send updated tweets to all clients
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })

    return socketServer
} */

const io = require('socket.io')
const { tweetService } = require('./services')
const { Tweet } = require('./models/tweet')

let socketServer = null

module.exports = async (app, server) => {
    const tweets = await tweetService.load().sort('-createdAt')
    console.log("tweets:", tweets)

    if (socketServer) return socketServer

    socketServer = new io.Server(server, {
        cors: {
            origin: "http://localhost:8080",
            credentials: true
        }
    })

    socketServer.on('connection', async (socket) => {
        console.log('A user connected')

        // Emit all tweets initially on connection
        socket.emit('tweets', tweets)

        // When a new tweet is added
        socket.on('newTweet', async (tweetData) => {
            try {
                const newTweet = new Tweet({
                    body,
                    author: tweetData.userId,
                    createdAt: new Date
                })
                await newTweet.save()

                socketServer.emit('newTweet', newTweet)
            } catch (error) {
                console.error('Error saving tweet:', error)
                socket.emit('error', { message: 'Failed to save tweet'})
            }
        })

        // When a tweet is updated
        socket.on('editTweet', async (updatedTweet) => {
            try {
                await Tweet.findByIdAndUpdate(updatedTweet._id, updatedTweet)
                socketServer.emit('editTweet', updatedTweet)
            } catch (error) {
                console.error('Error updating tweet:', error)
                socket.emit('error', { message: 'Failed to update tweet'})
        }

        // When a tweet is deleted
        socket.on('deleteTweet', async (tweetId) => {
            try {
                await Tweet.findByIdAndDelete(tweetId)
                socketServer.emit('deleteTweet', tweetId) // Emit tweet ID to remove it on the client side
            } catch {
                console.error('Error deleting tweet:', error)
                socket.emit('error', { message: 'Failed to delete tweet'})
            }
        })

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })

    return socketServer
})}
