const axios = require('axios');
module.exports = {
    name: 'dadjoke',
    description: 'Fetches a joke from a dad joke API',
    category: 'APIs',

    slash: 'both',
    testOnly: true,

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',

    callback: ({ args }) => {
        return ':)'
    }
}