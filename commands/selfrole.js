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
  category: 'Configuration',
  description: 'Adds a role to the self role message.',

  permissions: ['ADMINISTRATOR'],

  minArgs: 3,
  maxArgs: 3,
  expectedArgs: '<channel> <messageId> <role>',
  expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

  slash: 'both',
  testOnly: false,
  guildOnly: true,

  init: (client) => {
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
        }

        for (const id of values) {
          member.roles.add(id)
        }
        
        if (interaction) {
        interaction.reply({
          content: 'Roles updated!',
          ephemeral: true,
        })
      } else {
        return 'Roles updated'
      }
      }
    })
  },

  callback: async ({ message, interaction, args, client }) => {
    return `This command has beem disabled to prevent crashes any existing self role menus should still work`
    // const channel = (
    //   message
    //     ? message.mentions.channels.first()
    //     : interaction.options.getChannel('channel')
    // )
    // if (!channel || channel.type !== 'GUILD_TEXT') {
    //   return 'Please tag a text channel.'
    // }

    // const messageId = args[1]

    // const role = (
    //   message
    //     ? message.mentions.roles.first()
    //     : interaction.options.getRole('role')
    // )
    // if (!role) {
    //   return 'Unknown role!'
    // }

    // const targetMessage = await channel.messages.fetch(messageId, {
    //   cache: true,
    //   force: true,
    // })

    // if (!targetMessage) {
    //   return 'Unknown message ID.'
    // }

    // if (targetMessage.author.id !== client.user?.id) {
    //   return `Please provide a message ID that was sent from <@${client.user?.id}> (Don't have one? Just use /send to make one)`
    // }

    // let row = targetMessage.components[0]
    // if (!row) {
    //   row = new MessageActionRow()
    // }

    // const option = [
    //   {
    //     label: role.name,
    //     value: role.id,
    //   },
    // ]

    // let menu = row.components[0]
    // if (menu) {
    //   for (const o of menu.options) {
    //     if (o.value === option[0].value) {
    //       return {
    //         custom: true,
    //         content: `<@&${o.value}> is already part of this menu.`,
    //         allowedMentions: {
    //           roles: [],
    //         },
    //         ephemeral: true,
    //       }
    //     }
    //   }

    //   menu.addOptions(option)
    //   menu.setMaxValues(menu.options.length)
    // } else {
    //   row.addComponents(
    //     new MessageSelectMenu()
    //       .setCustomId('auto_roles')
    //       .setMinValues(0)
    //       .setMaxValues(1)
    //       .setPlaceholder('Select your roles...')
    //       .addOptions(option)
    //   )
    // }

    // targetMessage.edit({
    //   components: [row],
    // })

    // return {
    //   custom: true,
    //   content: `Added <@&${role.id}> to the auto roles menu.`,
    //   allowedMentions: {
    //     roles: [],
    //   },
    //   ephemeral: true,
    // }
  },
}