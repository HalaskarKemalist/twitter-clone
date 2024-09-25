const io = require('socket.io')
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
}