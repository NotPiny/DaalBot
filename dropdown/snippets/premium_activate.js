const DJS = require('discord.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');
const client = require('../../client.js');

/**
 * @param {DJS.StringSelectMenuInteraction<DJS.CacheType>} interaction 
*/
module.exports = async (interaction) => {
    const guild = client.guilds.cache.get(interaction.values[0]);

    /**
     * @type {number}
    */
    const activation = daalbot.premium.activateServer(guild.id, interaction.user.id);

    switch (activation) {
        case 1:
            return interaction.reply({ content: 'You do not have DaalBot premium!', ephemeral: true });
        case 2:
            return interaction.reply({ content: 'You have activated all the servers you can. If you want to activate the server you need more credits or deactivate a server', ephemeral: true });
        case 3:
            return interaction.reply({ content: 'This server is already activated.', ephemeral: true });
        case 0:
            return interaction.reply({ content: 'Server activated!', ephemeral: true });
    }
}