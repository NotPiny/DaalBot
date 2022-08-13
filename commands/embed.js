const { MessageEmbed } = require('discord.js');

module.exports = {
        category: 'Other',
        description: 'Sends a fully custom embed in a channel',

        permissions: ['ADMINISTRATOR'],
      
        slash: true,
        testOnly: false,
        guildOnly: true,

        minArgs: 3,
        maxArgs: 10,
        expectedArgs: '<channel> <title> <description> <url> <author> <footer>',
        expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING'],

        options: [
            {
              name: 'channel',
              description: 'The channel to send the embed',
              type: 'CHANNEL',
              required: true,
            },
            {
              name: 'title',
              description: `The title of the embed`,
              type: 'STRING',
              required: true,
            },
            {
              name: 'description',
              description: 'Sets the description of the embed',
              type: 'STRING',
              required: true,
            },
            {
              name: 'url',
              description: 'The URL that the embed links to',
              type: 'STRING',
              required: false,
            },
            {
              name: 'author',
              description: 'Sets the author of the embed',
              type: 'STRING',
              required: false,
            },
            {
              name: 'footer',
              description: 'Sets the footer of the embed',
              type: 'STRING',
              required: false,
            },
          ],
      
        callback: ({ interaction, channel, args }) => {
          // return 'Command has been disabled'
            const title = interaction.options.getString('title')
            const url = interaction.options.getString('url')
            const author = interaction.options.getString('author')
            const description = interaction.options.getString('description')
            // const RFT = interaction.options.getString('regular_field_title')
            // const RFTXT = interaction.options.getString('regular_field_text')
            // const IFT = interaction.options.getString('inline_field_title')
            // const IFTXT = interaction.options.getString('inline_field_text')
            const footer = interaction.options.getString('footer')
            const Tchannel = interaction.options.getChannel('channel')

            const Embed = new MessageEmbed()
            .setColor(0x0099FF)
            .setTitle(title)
            .setDescription(description)

            if (author === null) { Embed.setAuthor({name: ''}) } else { Embed.setAuthor({name: author}) }
            if (footer === null) { Embed.setFooter({text: ''}) } else { Embed.setFooter(footer) }

            if (!url === null) {
              if (!url.startsWith('https://')) {
                Embed.setURL(`https://${url}`)
              } else {
                Embed.setURL(`${url}`)
              }
            }

            try {
            Tchannel.send({
                embeds: [Embed]
            })
          } catch {
            console.log('Something went wrong')
            return `...Well this is awkward you are not meant to be able to see this`
          }

            return {
                custom: true,
                content: 'Sent Embed!',
                ephemeral: true,
            }
      }
    }