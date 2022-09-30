const config = require("../../config.json");
const fs = require('fs');
function save(GuildId, RoleId) {
    try {
        if (fs.existsSync(`${config.botPath}/db/verify/${GuildId}.role`)) {
            fs.writeFileSync(`${config.botPath}/db/verify/${GuildId}.role`, RoleId);
            // fs.appendFileSync(`\n${config.botPath}/db/verify/${GuildId}.role`, RoleId);
        } else {
            fs.writeFileSync(`${config.botPath}/db/verify/${GuildId}.role`, RoleId);
        }
    } catch (err) {
        console.log(err);
    }
}
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    category: 'Moderation',
    description: 'Creates a verification message in the server',
    permissions: ['MANAGE_ROLES'],
    testOnly: false,
    slash: true,
    options: [
        {
            name: 'channel',
            description: 'The channel to send the message in',
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'verified_role',
            description: 'The role to give to verified users',
            type: 'ROLE',
            required: true
        }
    ],

    callback: ({ interaction, client }) => {
        const channel = interaction.options.getChannel('channel')
        const verified_role = interaction.options.getRole('verified_role')
        const roleId = verified_role.id;
        const { guild } = interaction

        save(interaction.guild.id, roleId);

        const embed = new MessageEmbed()
            .setTitle('Verification')
            .setDescription('Click the button below to verify yourself.')
            .setColor(0x3cff00)

        const button = new MessageButton()
            .setStyle('SUCCESS')
            .setLabel('Verify')
            .setCustomId('verify')

        const row = new MessageActionRow().addComponents(button)

        channel.send({ embeds: [embed], components: [row] })

        return {
            custom: true,
            content: `Verification message sent in ${channel}`,
            ephemeral: true
        }
    }
}