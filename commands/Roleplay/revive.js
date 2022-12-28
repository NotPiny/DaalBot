module.exports = {
    category: 'Roleplay',
    description: 'Revives a user',

    slash: 'both',
    testOnly: false,
    
    options: [
        {
            name: 'user',
            description: 'The user to revive',
            type: 'USER',
            required: true,
        }
    ],

    callback: ({ guild, user, args, message }) => {
        const FMTId = args.shift().replace(/[<@!&>]/g, '');

        if (FMTId === '965270659515183206') {
            return `🧟 <@${user.id}> revives <@${FMTId}>\n(Thank You)`
            
            
          } else {
            if (FMTId === user.id) {
                return `🧟 <@${user.id}>, You can't revive yourself`
                
                
            }
          return `🧟 <@${user.id}> revives <@${FMTId}>`
          
          
      }
    }
}