const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot');

function getStartOfNextDay() {
    let date = new Date(); // Current date

    // Set the time to 00:00:00:000 for the next day
    date.setDate(date.getDate() + 1);
    date.setUTCHours(0, 0, 0, 0);

    // Return the date object
    return date;
}

/**
 * @param {Date} date 
 * @returns 
 */
function convertToDiscordTimestamp(date) {
    // Convert date to Unix timestamp (in seconds)
    var unixTimestamp = Math.floor(date.getTime() / 1000);
    
    // Format as Discord timestamp string
    var discordTimestamp = `<t:${unixTimestamp}:R>`;
    
    return discordTimestamp;
}

module.exports = {
    name: 'daily',
    description: 'Claim your daily XP',
    category: 'XP',

    type: 'SLASH',
    
    guildOnly: true,
    testOnly: true,

    callback: ({ interaction }) => {
        // Create a new Date object for the current date
        const currentDate = new Date();

        // Create a new Date object for January 1st, 1990
        const startDate = new Date('1990-01-01');

        // Calculate the difference in milliseconds
        const diffInMilliseconds = currentDate.getTime() - startDate.getTime();

        // Calculate the number of milliseconds in a day
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        // Calculate the difference in days
        const daysSinceEpoch = Math.floor(diffInMilliseconds / millisecondsPerDay);

        return interaction.reply(`Days since epoch: ${daysSinceEpoch}\nStart of next day: ${convertToDiscordTimestamp(getStartOfNextDay())}`)
    }
}