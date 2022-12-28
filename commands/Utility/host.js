const path = require('path')
const fs = require('fs')
const https = require('https')
const daalbot = require('../../daalbot.js')

module.exports = {
    name: 'host',
    description: 'Hosts a file and returns a link to it.',
    category: 'Utility',

    slash: true,
    testOnly: true, //guild testing

    options: [
        {
            name: 'file',
            description: 'The file to host.',
            type: 'ATTACHMENT',
            required: true
        }
    ],

    callback: (interaction) => {
        console.log('Le epic WOKCommands got the signal')
    }
}