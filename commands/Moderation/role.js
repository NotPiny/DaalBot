const actions = ['give', 'remove', 'has']

module.exports = {
  category: 'Moderation',
  description: 'Gives a role to a user',

  permissions: ['MANAGE_ROLES'],

  minArgs: 3,
  expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>`,

  slash: 'both',
  testOnly: false,
  guildOnly: true,

  options: [
    {
      name: 'action',
      description: `The action to perform. One of: ${actions.join(', ')}`,
      type: 'STRING',
      required: true,
      choices: actions.map((action) => ({
        name: action,
        value: action,
      })),
    },
    {
      name: 'user',
      description: 'The user to perform the action on',
      type: 'USER',
      required: true,
    },
    {
      name: 'role',
      description: 'The role to perform the action on',
      type: 'ROLE',
      required: true,
    },
  ],

  callback: ({ guild, args, interaction }) => {
    const action = args.shift()
    if (!action || !actions.includes(action)) {
      return `Unknown action! Please use one of the following: ${actions.join(
        ', '
      )}`
      
      
    }

    const memberId = args.shift().replace(/[<@!&>]/g, '')
    const roleId = args.shift().replace(/[<@!&>]/g, '')

    const member = guild.members.cache.get(memberId)
    const role = guild.roles.cache.get(roleId)

    if (!member) {
      return `Could not find member with ID ${memberId}`
      
      
    }

    if (!role) {
      return `Could not find role with ID ${roleId}`
      
      
    }

    // make sure the bot is higher than the role
    // if (interaction.guild.me.roles.highest.comparePositionTo(role) < 0) {
    //   return {
    //     custom: true,
    //     content: `My highest role must be higher than <@&${roleId}>`,
    //     allowedMentions: {
    //       roles: [],
    //     },
    //     ephemeral: true,
    //   }
    // }

    // // make sure the user how ran the command is higher than the role
    // if (interaction.member.roles.highest.comparePositionTo(role) < 0) {
    //   return {
    //     custom: true,
    //     content: `Your highest role must be higher than <@&${roleId}>`,
    //     allowedMentions: {
    //       roles: [],
    //     },
    //     ephemeral: true,
    //   }
    // }

    if (action === 'has') {
      return member.roles.cache.has(roleId)
        ? 'User has role'
        : 'User does not have role'
      
      
    }

    if (action === 'give') {
      if (!member.bannable) {
        return `The bot is not high enough on the rank list to manage this user`
        
        
      } else {
      member.roles.add(role)
      return 'Role given'
      
      
    }
  }

    if (action === 'remove') {
      if (!member.bannable) {
        return `The bot is not high enough on the rank list to manage this user`
        
        
      } else {
      member.roles.remove(role)
      return 'Role removed'
      
      
    }
  }

    return 'Unknown action'
    
    
  },
}