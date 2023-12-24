// Importing required modules
const client = require('../client.js');
const DJS = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const daalbot = require('../daalbot.js');
const csvman = require('@npiny/csvman');

// Function to send a YouTube alert to a Discord channel
async function sendYoutubeAlert(link, DChannel, role, channelName) {
    /**
     * @type {DJS.TextChannel}
    */
    // Fetch the Discord channel
    const channelObj = await client.channels.fetch(DChannel);

    // Send the alert message to the Discord channel
    channelObj.send(`${role != 'None' ? `<@&${role}>` : ''} **${channelName}** just posted a new video[.](${link})`);
}

// Set an interval to check for new YouTube videos every 15 seconds
setInterval(async () => {
    // Read and parse the YouTube data from a CSV file
    const youtubeData = await csvman.tools.csvBuilder((await fs.readFile(path.resolve('./db/socialalert/youtube.csv'), 'utf-8')));
    // Read the YouTube lock file which contains channel IDs that should not send alerts
    const youtubeLock = (await fs.readFile(path.resolve('./db/socialalert/youtube.lock'), 'utf-8')).split(',');

    // Initialize an array to store channel data
    let channels = [];

    // Get the YouTube channel, role, and Discord channel data from the CSV file
    const yChannelData = youtubeData.getColumnData('YChannel').data;
    const roleData = youtubeData.getColumnData('Role').data;
    const dChannelData = youtubeData.getColumnData('DChannel').data;

    // Read the file that contains previously detected videos
    const oldDetected = (await fs.readFile(path.resolve('./db/socialalert/youtube.detected'), 'utf-8')).split('\n');

    // Loop through the YouTube channel data
    for (let i = 0; i < yChannelData.length; i++) {
        // Get the YouTube channel, role, and Discord channel for the current iteration
        const channel = yChannelData[i];
        const role = roleData[i];
        const DChannel = dChannelData[i];

        // Check if the YouTube channel is already in the array
        // If it is, append the role and Discord channel
        // If it isn't, add a new object to the array
        const existingChannelIndex = channels.findIndex((c) => c.channel === channel);
        if (existingChannelIndex !== -1) {
            channels[existingChannelIndex].role.push(role);
            channels[existingChannelIndex].dchannel.push(DChannel);
        } else {
            channels.push({
                channel: channel,
                role: [role],
                dchannel: [DChannel]
            });
        }
    }

    // Loop through the channels array
    for (let i = 0; i < channels.length; i++) {
        // Get the channel, roles, and Discord channels for the current iteration
        const channel = channels[i];
        const roles = channel.role;
        const dchannels = channel.dchannel;
        const channelName = await daalbot.youtube.channelIdToName(channel.channel);

        // Get the old uploads for the current channel
        const channelOldUploads = oldDetected.find((c) => c.split('|')[0] === channel.channel)?.split('|')[1] ?? [];
        // Get the new uploads for the current channel
        const newUploads = (await daalbot.youtube.getChannelUploads(channel.channel, true)).join(',');

        // Check if there are any new uploads
        if (channelOldUploads != newUploads) {
            // Find the row for the channel in the old detected file
            const channelRowIndex = oldDetected.findIndex((c) => c.split('|')[0] === channel.channel);

            // Check if the video was already detected
            const newUploadsArr = newUploads.split(',');
            const oldUploadsArr = (channelOldUploads.split ? channelOldUploads : ',').split(',');
            let newlyDetected = newUploadsArr.filter((v) => !oldUploadsArr.includes(v));

            // Send a message to the Discord channel for each new upload
            for (let j = 0; j < dchannels.length; j++) {
                const dchannel = dchannels[j];
                const role = roles[j];

                for (let k = 0; k < newlyDetected.length; k++) {
                    const video = newlyDetected[k];

                    // Check if the channel is in the lock file
                    if (youtubeLock.includes(channel.channel)) {
                        newlyDetected.length = 0;
                        break;
                    }

                    // TODO: Fix this mess that prevents it sending alerts
                    // if (video == '') continue;
                    // if (!(await (daalbot.youtube.isVideoValid(video)))) continue;

                    // Send the YouTube alert
                    await sendYoutubeAlert(`https://www.youtube.com/watch?v=${video}`, dchannel, role, channelName);
                }
            }

            // Save the new uploads to the file
            if (channelRowIndex !== -1) {
                // Update the row
                oldDetected[channelRowIndex] = `${channel.channel}|${newUploads}`;
            } else {
                // Add a new row
                oldDetected.push(`${channel.channel}|${newUploads}`);
            }

            // Write the updated data to the file
            await fs.writeFile(path.resolve('./db/socialalert/youtube.detected'), oldDetected.join('\n'));
        }
    }

    // Wipe the lock file
    await fs.writeFile(path.resolve('./db/socialalert/youtube.lock'), '');
}, 5 * 60 * 1000);