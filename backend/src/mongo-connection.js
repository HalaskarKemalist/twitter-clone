/* eslint-disable no-console */
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/Twitter'
console.log('MONGODB_CONNECTION_STRING: ', connectionString)

mongoose.set('debug', false)

mongoose
  .connect(connectionString)
  .then(() => console.log('Database connection established.'))
  .catch(console.log)

module.exports = mongoose.connection