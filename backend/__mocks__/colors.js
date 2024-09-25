const colors = jest.genMockFromModule('colors');

const unity = s => s

colors.bgBlue = {}
colors.blue = unity
colors.bgBlue.white = unity

module.exports = colors