const { MessageEmbed } = require('discord.js');

module.exports = {
        category: 'Other',
        description: 'Sends a customisable embed',

        permissions: ['ADMINISTRATOR'],
      
        slash: true,
        testOnly: false,
        guildOnly: true,

        minArgs: 10,
        expectedArgs: '<title> <url> <author> <description> <regular_field_title> <regular_field_text> <inline_field_title> <inline_field_text> <footer> <channel>',
        expectedArgsTypes: ['STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'CHANNEL'],

        options: [
            {
              name: 'title',
              description: `The title of the embed`,
              type: 'STRING',
              required: true,
            },
            {
              name: 'url',
              description: 'The URL that the embed links to',
              type: 'STRING',
              required: true,
            },
            {
              name: 'author',
              description: 'Sets the author of the embed',
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
              name: 'regular_field_title',
              description: 'Sets the regular field title',
              type: 'STRING',
              required: true,
            },
            {
                name: 'regular_field_text',
                description: 'Sets the regular field text',
                type: 'STRING',
                required: true,
            },
            {
              name: 'inline_field_title',
              description: 'Sets the inline field title',
              type: 'STRING',
              required: true,
            },
            {
                name: 'inline_field_text',
                description: 'Sets the inline field text',
                type: 'STRING',
                required: true,
            },
            {
              name: 'footer',
              description: 'Sets the footer of the embed',
              type: 'STRING',
              required: true,
            },
            {
              name: 'channel',
              description: 'The channel to send the embed',
              type: 'CHANNEL',
              required: true,
            }
          ],
      
        callback: ({ interaction, channel, args }) => {
            const title = args.shift()
            const url = args.shift()
            const author = args.shift()
            const description = args.shift()
            const RFT = args.shift()
            const RFTXT = args.shift()
            const IFT = args.shift()
            const IFTXT = args.shift()
            const footer = args.shift()
            const Tchannel = interaction.options.getChannel('channel')

            const Embed = new MessageEmbed()
            .setColor(0x0099FF)
            .setTitle(title)
            .setURL(url)
            .setAuthor({ name: author })
            .setDescription(description)
            .addFields(
                { name: RFT, value: RFTXT },
                { name: IFT, value: IFTXT, inline: true }
            )
            .setFooter({ text: footer });

            if (!url.startsWith('https://')) {
                Embed.setURL(`https://${url}`)
            }

            Tchannel.send({
                embeds: [Embed]
            })

            return {
                custom: true,
                content: 'Sent Embed!',
                ephemeral: true,
            }
        },
}