const {
    Client,
    GuildMember,
    MessageActionRow,
    MessageSelectMenu,
    MessageSelectOptionData,
    Role,
    TextChannel,
  } = require('discord.js')
  
  module.exports = {
    category: 'Pen',
    description: 'pendit',
  
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <Text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],
  
    slash: 'both',
    testOnly: false,
    guildOnly: true,
    ownerOnly: true,
  
    callback: async ({ message, interaction, args, client }) => {
      const channel = (
        message
          ? message.mentions.channels.first()
          : interaction.options.getChannel('channel')
      )
      if (!channel || channel.type !== 'GUILD_TEXT') {
        return 'Please tag a text channel.'
        
        
      }
  
      const messageId = args[1]
  
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

      args.shift() // Remove the channel from the arguments array
      args.shift() // Remove the messageId from the arguments array
      const text = args.join(' ')
      const result = text.replace(/<nl>/g, "\n");
  
      targetMessage.edit(result)
  
      if (interaction) {
      return {
        custom: true,
        content: `Message has been edited`,
        ephemeral: true,
      }
      
      
    } else {
      return 'Message has been edited'
      
      
    }
  },
}