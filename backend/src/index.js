const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()
const session = require("express-session");
const MongoStore = require('connect-mongo')
const passport = require('passport')
// const LocalStrategy = require('passport-local')
const helmet = require('helmet')
const sanitize = require('express-mongo-sanitize').sanitize
const compression = require('compression')
const { errors } = require('celebrate')
const io = require('socket.io')
// const { createServer } = require('node:http')
// const { join } = require("node:path")
const cors = require('cors')

// const rateLimiter = require('./lib/rate-limiter')

const User = require('./models/user')
const mongooseConnection = require('./mongo-connection')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const tweetsRouter = require('./routes/tweets')
const feedRouter = require('./routes/home')
// const searchRouter = require('./routes/search')
// const notificationsRouter = require('./routes/notifications')
// const adminRouter = require('./routes/admin')
const accountRouter = require('./routes/account');

const app = express()

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://quo.vote' : true,
    credentials: true
}))

app.set('trust proxy', 1)


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(session({
    store: MongoStore.create({
        mongoUrl: mongooseConnection.client.s.url,
        stringify: false
    }),
    secret: 'very_secret_key1283',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        // sameSite: process.env.NODE_ENV === 'production' && 'none',
        // secure: process.env.NODE_ENV === 'production'
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // Use 'lax' for development, 'none' for cross-origin in production
        secure: process.env.NODE_ENV === 'production'  // Set to 'true' in production for HTTPS; 'false' in development
    },
    resave: false,
    saveUninitialized: false }))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// app.use(rateLimiter({ keys: ['ip', 'session.id'] }))

app.all('*', (req, res, next) => {
    req.body = sanitize(req.body)
    req.headers = sanitize(req.headers)
    req.params = sanitize(req.params)

    next()
})

app.use('/api/', indexRouter)
app.use('/api/home', feedRouter)
app.use('/api/auth', authRouter)
app.use('/api/tweets', tweetsRouter)
app.use('/api/users', usersRouter)
app.use('/api/account', accountRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
  })

app.use(errors())

// error handler
/* eslint-disable-next-line */
app.use((err, req, res, next) => {
    const error = {
      status: err.status || 500,
      message: err.message,
    }

    if (req.app.get('env') === 'development') {
      error.stack = err.stack
    }

    res.status(error.status)

    res.send(error)
  })


module.exports = app