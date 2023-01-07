const {
  Client,
  GuildMember,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  TextChannel,
} = require('discord.js')
const config = require('../../config.json')

module.exports = {
  category: 'Message',
  description: 'Adds a role to the self role message.',

  requireRoles: true,

  minArgs: 3,
  maxArgs: 4,
  expectedArgs: '<channel> <message_id> <role> <place_holder>',
  expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE', 'STRING'],

  slash: true,
  testOnly: false,
  ownerOnly: false,
  guildOnly: true,

  options: [
    {
      name: 'channel',
      description: 'The channel that the message is in',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'message_id',
      description: 'The message to add to',
      type: 'STRING',
      required: true
    },
    {
      name: 'role',
      description: 'The role to add',
      type: 'ROLE',
      required: true
    },
    {
      name: 'place_holder',
      description: 'The placeholder text when no roles are selected',
      type: 'STRING',
      required: false
    }
  ],

  init: (client = Client) => {
    client.on('interactionCreate', (interaction) => {
      if (!interaction.isSelectMenu()) {
        return
      }

      const { customId, values, member } = interaction

      if (customId === 'auto_roles' && member instanceof GuildMember) {
        const component = interaction.component
        const removed = component.options.filter((option) => {
          return !values.includes(option.value)
        })

        for (const id of removed) {
          member.roles.remove(id.value)
          .then(() => { console.log('Changed Role!') })
          .catch(() => { 
            console.log('Failed to change role')
          })
        }

        for (const id of values) {
          member.roles.add(id)
          .then(() => { console.log('Changed Role!') })
          .catch(() => { 
            console.log('Failed to change role')
          })
        }

        interaction.reply({
          content: 'Roles updated!',
          ephemeral: true,
        })
        .then(() => { console.log(':)') })
        .catch(() => { console.log('bruh') })
      }
    })
  },

  callback: async ({ message, interaction, args, client }) => {
    // if (config.WOKCommands.BotOwners.includes(interaction.user.id)) {
      const channel = (
        message
          ? message.mentions.channels.first()
          : interaction.options.getChannel('channel')
      )
      if (!channel || channel.type !== 'GUILD_TEXT') {
        return 'Please tag a text channel.'
      }
  
      const messageId = args[1]
      const place_holder = interaction.options.getString('place_holder');
  
      const role = (
        message
          ? message.mentions.roles.first()
          : interaction.options.getRole('role')
      )
      if (!role) {
        return 'Unknown role!'
      }
  
      const targetMessage = await channel.messages.fetch(messageId, {
        cache: true,
        force: true,
      })
  
      if (!targetMessage) {
        return 'Unknown message ID.'
      }
  
      if (targetMessage.author.id !== client.user?.id) {
        return `Please provide a message ID that was sent from <@${client.user?.id}>`
      }
  
      let row = targetMessage.components[0]
      if (!row) {
        row = new MessageActionRow()
      }
  
      const option = [
        {
          label: role.name,
          value: role.id,
        },
      ]
  
      let menu = row.components[0]
      if (menu) {
        for (const o of menu.options) {
          if (o.value === option[0].value) {
            return {
              custom: true,
              content: `<@&${o.value}> is already part of this menu.`,
              allowedMentions: {
                roles: [],
              },
              ephemeral: true,
            }
          }
        }
  
        menu.addOptions(option)
        menu.setMaxValues(menu.options.length)
      } else {
        if (place_holder == null) {
          row.addComponents(
            new MessageSelectMenu()
              .setCustomId('auto_roles')
              .setMinValues(0)
              .setMaxValues(1)
              .setPlaceholder('Pick your roles!')
              .addOptions(option)
          )
        } else {
        row.addComponents(
          new MessageSelectMenu()
            .setCustomId('auto_roles')
            .setMinValues(0)
            .setMaxValues(1)
            .setPlaceholder(place_holder)
            .addOptions(option)
        )
        }
      }
  
      try {
      targetMessage.edit({
        components: [row],
      })
    } catch {
      console.log('bruh')
      return 'Something went wrong!'
    }
  
      return {
        custom: true,
        content: `Added <@&${role.id}> to the auto roles menu.`,
        allowedMentions: {
          roles: [],
        },
        ephemeral: true,
      }  
    // } else {
      // return 'Sorry for the inconvenience, but this command is currently disabled due to bugs.'
    // }
  },
}
