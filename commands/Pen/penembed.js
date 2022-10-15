const { MessageEmbed } = require('discord.js');
const colours = ['red', 'green', 'blue', 'purple', 'pink']

module.exports = {
        category: 'Pen',
        description: 'penembed',
      
        slash: true,
        ownerOnly: true,
        testOnly: false,
        guildOnly: true,

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
            // {
            //   name: 'message_id',
            //   description: 'Filling this in will edit the message with the embed',
            //   type: 'STRING',
            //   required: false,
            // },
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
            const messageId = await interaction.options.getString('message_id');

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

            if (messageId == null) {
              try {
                Tchannel.send({
                  embeds: [Embed]
                })
                
                
              } catch {
                console.log('Something went wrong')
                return `...Well this is awkward you are not meant to be able to see this`
                
                
              }
            } else {
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
              if (content === '') {
                targetMessage.edit({
                  embeds: [Embed]
                })
                .then(() => { console.log('Successfully edited the message'); })
                
              } else {
              targetMessage.edit({
                content: content,
                embeds: [Embed]
              })
              .then(() => { console.log('Successfully edited the message'); })
              
            }
          } catch {
            console.log('Something went wrong')
            return {
              custom: true,
              content: `...Well this is awkward you are not meant to be able to see this`,
              ephemeral: true,
            }
            
            
          }
        }

            return {
                custom: true,
                content: 'Sent Embed!',
                ephemeral: true,
            }
            
            
      }
    }