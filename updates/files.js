const fs = require('fs');
const path = require('path');
const client = require('../client.js');
const { EmbedBuilder } = require('discord.js');
const DJS = require('discord.js');

fs.watchFile(path.resolve('./PRIVACY.md'), () => {
    const embed = new EmbedBuilder()
        .setDescription(fs.readFileSync(path.resolve(`./PRIVACY.md`), 'utf8').replace('<br/>', '\n'))
        .setTimestamp();
    
    /**
     * @type {DJS.TextChannel}
     */
    const announcementChannel = client.channels.cache.get('1003822202413662248');
    announcementChannel.send({ content: `<@&1011614505324793917> Privacy Policy has been updated`, embeds: [embed] });
})