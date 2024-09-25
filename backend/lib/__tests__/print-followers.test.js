const printFollowers = require('../print-followers')

test('prints user\'s followers when a user has at least one follower', () => {
    // initialization
    const user = {
        name: 'Armagan',
        followers: [{
            name: 'Kaan'
        }]
    }
    const consoleSpy = jest.spyOn(console, 'log');

    // test
    printFollowers(user)


    // assertions
    expect(consoleSpy).toHaveBeenCalledWith('Kaan');

    // teardown
    consoleSpy.mockRestore();
})

test('prints warning message when a user has no followers', () => {
    // initialization
    const user = {
        name: 'Armagan',
        followers: []
    }
    const consoleSpy = jest.spyOn(console, 'log')

    // test
    printFollowers(user)

    // assertions
    expect(consoleSpy).toHaveBeenCalledWith('Armagan has no follower yet.')

    // teardown
    consoleSpy.mockRestore()
})