const { MessageEmbed } = require('discord.js');
const colours = ['red', 'green', 'blue', 'purple', 'pink']

module.exports = {
        category: 'Pen',
        description: 'Sends a fully custom embed in a channel',
      
        slash: true,
        ownerOnly: false,
        testOnly: false,
        guildOnly: true,
        requireRoles: true,

        minArgs: 2,
        maxArgs: 7,
        expectedArgs: '<channel> <title> <url> <author> <description> <footer> <colour>',

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
              name: 'url',
              description: 'The URL that the embed links to',
              type: 'STRING',
              required: false,
            },
            {
              name: 'description',
              description: 'Sets the description of the embed',
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
            {
              name: 'colour',
              description: `The colour of the embed. One of: ${colours.join(', ')}`,
              type: 'STRING',
              required: false,
              choices: colours.map((colour) => ({
                name: colour,
                value: colour,
              })),
            },
          ],
      
        callback: async ({ interaction, channel, args }) => {
          // return 'Command has been disabled'
            const title = await interaction.options.getString('title');
            const url = await interaction.options.getString('url');
            const author = await interaction.options.getString('author');
            const description = await interaction.options.getString('description');
            const colour = await interaction.options.getString('colour');
            const footer = await interaction.options.getString('footer');
            const Tchannel = await interaction.options.getChannel('channel');

            const Embed = new MessageEmbed()
            .setTitle(title)

            if (author === null) { Embed.setAuthor({name: ''}) } else { Embed.setAuthor({name: author}) }
            if (footer === null) { Embed.setFooter({text: ''}) } else { Embed.setFooter(footer) }
            if (description === null) { Embed.setDescription('') } else { Embed.setDescription(description.replace(/<nl>/g, '\n')) }
            
            if (colour === null) {
              Embed.setColor(0x0099FF)
            } else {
            if (colour === 'red') { Embed.setColor(0xff0000) }
            if (colour === 'purple') { Embed.setColor(0x6600ff) }
            if (colour === 'blue') { Embed.setColor(0x00a6ff) }
            if (colour === 'pink') { Embed.setColor(0xf603c6) }
            if (colour === 'green') { Embed.setColor(0x13f603) }
            }


            if (url === null) { Embed.setURL('') } else { 
              Embed.setURL(url) 
            if (!url.startsWith('https://')) {
                Embed.setURL(`https://${url}`)
            }
          }

            return {
                custom: true,
                content: 'Sent Embed!',
                ephemeral: true,
            }
            
            
      }
    }