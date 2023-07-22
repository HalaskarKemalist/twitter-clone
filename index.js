const userDatabase = require('./database/user-database')
const printFollowUpHistory = require('./lib/print-follow-up-history')

async function main() {
    const tolga = await userDatabase.findBy('name', 'Tolga')
    const kaan = await userDatabase.findByName('Kaan')

    
    tolga.toFollow(kaan)

    userDatabase.update(kaan)
    userDatabase.update(tolga)
    
    printFollowUpHistory(kaan)
    console.log('-------')
    printFollowUpHistory(tolga)
}

main()