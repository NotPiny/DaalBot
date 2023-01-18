const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot');

module.exports = {
    name: 'daily',
    description: 'Claim your daily XP',
    category: 'XP',

    slash: true,
    
    guildOnly: true,
    testOnly: true,

    callback: ({ interaction }) => {
        const timeStamp = Math.floor(Date.now() / 1000);

        return `One day from now is <t:${timeStamp + 86400}:R>`
    }
}