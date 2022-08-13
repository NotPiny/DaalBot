const { MessageEmbed } = require('discord.js');
const colours = ['red', 'green', 'blue', 'purple', 'pink']

module.exports = {
        category: 'Other',
        description: 'penembed',
      
        slash: true,
        ownerOnly: true,
        testOnly: false,
        guildOnly: true,

        minArgs: 4,
        maxArgs: 11,
        expectedArgs: '<channel> <title> <url> <author> <description> <regular_field_title> <regular_field_text> <inline_field_title> <inline_field_text> <footer> <colour>',

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
              required: true,
            },
            {
              name: 'description',
              description: 'Sets the description of the embed',
              type: 'STRING',
              required: true,
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
              description: `The action to perform. One of: ${colours.join(', ')}`,
              type: 'STRING',
              required: false,
              choices: colours.map((colour) => ({
                name: colour,
                value: colour,
              })),
            },
            {
              name: 'message_id',
              description: 'Filling this in will edit the message with the embed',
              type: 'STRING',
              required: false,
            },
          ],
      
        callback: async ({ interaction, channel, args }) => {
          // return 'Command has been disabled'
            const title = await interaction.options.getString('title')
            const url = await interaction.options.getString('url')
            const author = await interaction.options.getString('author')
            const description = await interaction.options.getString('description')
            const colour = await interaction.options.getString('colour')
            const footer = await interaction.options.getString('footer')
            const Tchannel = await interaction.options.getChannel('channel')
            const messageId = await interaction.options.getString('message_id')

            const Embed = new MessageEmbed()
            .setTitle(title)
            .setURL(url)
            .setDescription(description)

            if (author === null) { Embed.setAuthor({name: ''}) } else { Embed.setAuthor({name: author}) }
            if (footer === null) { Embed.setFooter({text: ''}) } else { Embed.setFooter(footer) }
            
            if (!colour === null) {
            if (colour === 'red') { Embed.setColor(208227) }
            if (colour === 'purple') { Embed.setColor(14419254) }
            if (colour === 'blue') { Embed.setColor(74144226) }
            if (colour === 'pink') { Embed.setColor(2550187) }
            if (colour === 'green') { Embed.setColor(1362550) }
            } else {
                Embed.setColor(0x0099FF)
            }

            if (!url.startsWith('https://')) {
                Embed.setURL(`https://${url}`)
            }

            if (!messageId == null) {
              try {
                const targetMessage = await channel.messages.fetch(messageId, {
                  cache: true,
                  force: true,
                })
                if (!targetMessage) {
                  return 'Unknown message ID.'
                }
            
                if (targetMessage.author.id !== client.user?.id) {
                  return `Please provide a message ID that was sent from <@${client.user?.id}> (Don't have one? Just use /send to make one)`
                }
                const content = targetMessage.content;
                targetMessage.edit({
                  content: content,
                  embeds: [Embed]
                }) 
              } catch {
                console.log('Something went wrong')
                return `...Well this is awkward you are not meant to be able to see this`
              }
            } else {
            try {
            Tchannel.send({
                embeds: [Embed]
            })
          } catch {
            console.log('Something went wrong')
            return `...Well this is awkward you are not meant to be able to see this`
          }
        }

            return {
                custom: true,
                content: 'Sent Embed!',
                ephemeral: true,
            }
      }
    }