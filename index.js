const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users')
const indexRouter = require('./routes/index')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use('/users', usersRouter)
app.use('/', indexRouter)

app.listen(3001, () => {
    console.log('started listening Twitter on 3001')
})