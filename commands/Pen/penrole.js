const actions = ['give', 'remove', 'has']

module.exports = {
  category: 'Pen',
  description: 'penrole',

  minArgs: 3,
  expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>`,

  slash: true,
  testOnly: false,
  guildOnly: true,
  ownerOnly: true,

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

  callback: ({ guild, args }) => {
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
      return {
        custom: true,
        content: 'Role given',
        ephemeral: true,
    }
    
    
    }
  }

    if (action === 'remove') {
      if (!member.bannable) {
        return `The bot is not high enough on the rank list to manage this user`
        
        
      } else {
      member.roles.remove(role)
      return {
        custom: true,
        content: 'Role removed',
        ephemeral: true,
      }
      
      
    }
  }

    return 'Unknown action'
    
    
  },
}