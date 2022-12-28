module.exports = {
    category: 'Roleplay',
    description: 'Gives a heart to a user',

    slash: 'both',
    testOnly: false,
    
    options: [
        {
            name: 'user',
            description: 'The user to give a heart',
            type: 'USER',
            required: true,
        }
    ],

    callback: ({ guild, user, args, message }) => {
        const FMTId = args.shift().replace(/[<@!&>]/g, '');

        if (FMTId === '965270659515183206') {
            return `<:wumplove:1027600639150260254> <@${user.id}> gives a heart to <@965270659515183206>\nHere have one back\n<:wumplove:1027600639150260254> <@965270659515183206> gives a heart to <@${user.id}>`
            
            
          } else {
            if (FMTId === user.id) {
                return `<:wumplove:1027600639150260254> <@${user.id}> gives a heart to themself`
                
                
            }
          return `<:wumplove:1027600639150260254> <@${user.id}> gives a heart to <@${FMTId}>`
          
          
      }
    }
}