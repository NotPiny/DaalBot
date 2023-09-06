// This file is to keep track of the DM's to the bot.
console.log('DM.js is ready!');

const { ChannelType } = require('discord.js');
const client = require('../client.js');

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === ChannelType.DM) {
        console.log(`DM from ${msg.author.tag}: "${msg.content}"`);
    }
})