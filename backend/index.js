const express = require('express')
const bodyParser = require('body-parser')
const session = require("express-session");
const MongoStore = require('connect-mongo')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local')
// const helmet = require('helmet')
// const sanitize = require('express-mongo-sanitize').sanitize
// const compression = require('compression')
// const { errors } = require('celebrate')
const io = require('socket.io')
const { createServer } = require('node:http')
const { join } = require("node:path")
const cors = require('cors')

// const rateLimiter = require('./lib/rate-limiter')

const User = require('./models/user')
const { mongoose } = require('./mongo-connection')


const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const tweetsRouter = require('./routes/tweets')
const feedRouter = require('./routes/home')
const searchRouter = require('./routes/search')
const notificationsRouter = require('./routes/notifications')
const adminRouter = require('./routes/admin')
const accoutRouter = require('./routes/account');
const { stringify } = require('flatted');

const app = express()

app.use(logger('dev'))
// app.use(logger('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
// app.use(helmet())
// app.use(compression())

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))

app.set('trust proxy', 1)






const port = process.env.PORT || 3000;

require('./mongo-connection')

app.set('view engine', 'pug')

app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Twitter', stringify: false }),
    secret: 'very_secret_key1283',
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        // sameSite: process.env.NODE_ENV === 'production' && 'none',
        // secure: process.env.NODE_ENV === 'production'
        sameSite: 'none',
        secure: false
    },
    resave: false,
    saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/api/', indexRouter)
app.use('/api/home', feedRouter)
app.use('/api/auth', authRouter)
app.use('/api/tweets', tweetsRouter)
app.use('/api/users', usersRouter)
app.use('/api/account', accoutRouter)

module.exports = app