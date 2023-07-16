const userDatabase = require('./database/user-database')
const printFollowUpHistory = require('./lib/print-follow-up-history')

const tolga = userDatabase.findBy('name', 'Tolga')
const kaan = userDatabase.findByName('Kaan')

tolga.toFollow(kaan)
userDatabase.update(kaan)
userDatabase.update(tolga)

const tolga2 = userDatabase.findBy('name', 'Tolga')
const kaan2 = userDatabase.findByName('Kaan')

printFollowUpHistory(kaan2)
console.log('-------')
printFollowUpHistory(tolga2)