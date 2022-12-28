module.exports = {
    category: 'Roleplay',
    description: 'Kills a user',

    slash: 'both',
    testOnly: false,
    
    options: [
        {
            name: 'user',
            description: 'The user to kill',
            type: 'USER',
            required: true,
        }
    ],

    callback: ({ guild, user, args, message }) => {
        const FMTId = args.shift().replace(/[<@!&>]/g, '');

        if (FMTId === '965270659515183206') {
            return `🔪 <@${user.id}>, I cannot be killed`
          } else {
            if (FMTId === user.id) {
                return `🔪 <@${user.id}> kills <@${user.id}>`
            }
          return `🔪 <@${user.id}> kills <@${FMTId}>`          
      }
    }
}