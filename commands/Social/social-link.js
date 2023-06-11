const fs = require('fs')
const path = require('path')
const { MessageEmbed } = require('discord.js')
const daalbot = require('../../daalbot.js')
require('dotenv').config()
const crypto = require('crypto')

module.exports = {
    name: 'social-link',
    description: 'Modifies social feeds for the server.',
    category: 'Social',

    testOnly: true,

    slash: true,

    options: [
        {
            name: 'twitch',
            description: 'Modifies the Twitch feeds for the server.',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'add',
                    description: 'Adds a Twitch feed to the server.',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'channel',
                            description: 'The name of the twitch channel to add.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'feed_channel',
                            description: 'The channel to send the feed to.',
                            type: 'CHANNEL',
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'The role to ping when the streamer goes live.',
                            type: 'ROLE',
                            required: false
                        }
                    ]
                }
            ]
        }
    ],

    callback: async ({ interaction }) => {
        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        if (subCommandGroup == 'twitch') {
            if (subCommand == 'add') {
                const channel = interaction.options.getString('channel')
                const feedChannel = interaction.options.getChannel('feed_channel')
                const role = interaction.options.getRole('role')

                const twitchData = fs.readFileSync(path.resolve('./db/socialalert/twitch.txt'), 'utf8').split('\n')

                if (twitchData.filter(i => i.split(',')[0] == channel).length > 0) {
                    const embed = new MessageEmbed()
                        .setTitle('Error')
                        .setDescription('This channel is already linked to a Twitch feed.')
                        .setColor('RED')

                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }

                const key = Buffer.from(process.env.TWITCH_KEY, 'hex');
                const iv = Buffer.from(process.env.TWITCH_IV, 'hex');

                const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

                // Create a webhook if one doesn't exist

                // Check if the channel is already linked to a webhook
                const webhookFile = JSON.parse(fs.readFileSync(path.resolve('./db/socialalert/twitch-webhooks.json'), 'utf8'))

                const channelObject = webhookFile.filter(i => i.id == feedChannel.id)[0]

                const webhook = channelObject ? channelObject.webhook : await feedChannel.createWebhook('Twitch Feed')

                if (!channelObject) {
                    // Encrypt the webhook before saving it
                    const encryptedWebhook = cipher.update(webhook.url, 'utf8', 'hex') + cipher.final('hex')
                }

                return interaction.reply({
                    content: `Added Twitch feed for ${channel} to <#${feedChannel.id}>.`,
                })
            }
        }
    }
}