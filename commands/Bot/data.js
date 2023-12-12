const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');
module.exports = {
    name: 'data',
    description: 'Modfies / Gets / Deletes data from the bot',
    category: 'Bot',

    type: 'SLASH',
    testOnly: true,

    options: [
        {
            name: 'info',
            description: 'Gets info about data from the bot',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'policy',
                    description: 'Gets info about the privacy policy',
                    type: ApplicationCommandOptionType.Subcommand,
                }
            ]
        },
        {
            name: 'actions',
            description: 'Modifies data from the bot',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'delete',
                    description: 'Deletes data from the bot',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'type',
                            description: 'The type of data to delete',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'User (Data that includes your user id)',
                                    value: 'user'
                                },
                                {
                                    name: 'Guild (Data that includes the current guild id)',
                                    value: 'guild'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'cancel',
                    description: 'Cancels a deletion of data from the bot',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'type',
                            description: 'The type of data to cancel',
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: 'User (Data that includes your user id)',
                                    value: 'user'
                                },
                                {
                                    name: 'Guild (Data that includes the current guild id)',
                                    value: 'guild'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    callback: async({interaction}) => {
        const subCommandGroup = interaction.options.getSubcommandGroup();
        const subCommand = interaction.options.getSubcommand();

        if (subCommandGroup === 'info') {
            if (subCommand === 'policy') {
                const embed = new EmbedBuilder()
                    .setDescription(fs.readFileSync(path.resolve(`./PRIVACY.md`), 'utf8').replace('<br/>', '\n'));

                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }

        if (subCommandGroup === 'actions') {
            if (subCommand === 'delete') {
                const type = interaction.options.getString('type');

                if (type === 'guild') {
                    if (fs.existsSync(path.resolve(`./temp/${interaction.guild.id}.del`))) {
                        return interaction.reply({ content: 'Deletion already scheduled.', ephemeral: true });
                    }

                    const embed = new EmbedBuilder()
                        .setTitle('Deletion scheduled (TEST)')
                        .setDescription(`Guild data for ${interaction.guild.name} will be deleted <t:${(Math.floor(Date.now() / 1000)) + 24 * 60 * 60}:R> unless you cancel it with \`/data actions cancel\``)
                        .setFooter({
                            text: 'All current data will be deleted, this will not affect any data that is added after the deletion is complete'
                        })
                        .setColor('Red');

                    interaction.reply({ embeds: [embed] });

                    fs.appendFileSync(path.resolve(`./temp/${interaction.guild.id}.del`), Math.floor(Date.now()) + 24 * 60 * 60 * 1000);

                    daalbot.timestampEvents.once(`${Math.floor(Date.now()) + 24 * 60 * 60 * 1000}`, () => {
                        // Executes once the countdown is over
                        if (fs.readFileSync(path.resolve(`./temp/${interaction.guild.id}.del`), 'utf8') === 'ABORTED') return; // If the deletion was aborted, don't delete the data

                        // TODO
                    })
                }
            }
        }
    }
}