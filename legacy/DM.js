// This file is to keep track of the DM's to the bot.
console.log('DM.js is ready!');

const client = require('../client.js');

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "DM") {
        console.log(`DM from ${msg.author.tag}: "${msg.content}"`);
    }
})