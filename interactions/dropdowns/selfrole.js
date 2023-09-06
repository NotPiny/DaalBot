const client = require('../../client.js');
const { GuildMember } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('interactionCreate', (interaction) => {
    if (!interaction.isStringSelectMenu()) {
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
        .catch(() => { 
          console.error('Failed to change role')
        })
      }

      for (const id of values) {
        member.roles.add(id)
        .catch(() => { 
          console.error('Failed to change role')
        })
      }

      interaction.reply({
        content: 'Roles updated!',
        ephemeral: true,
      })
      .catch(() => { console.error('bruh') })
    }
})