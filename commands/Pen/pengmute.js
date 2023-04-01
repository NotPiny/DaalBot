// JAVASCRIPT:
const actions = ['add', 'remove', 'has'];
const fs = require('fs');
const path = require('path');

module.exports = {
  category: "Pen",
  description: "Pengmute",

  requireRoles: false,

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
  ],

  callback: async ({ args, interaction }) => {
    // return 'Command disabled'
    const action = args.shift()
    if (!action || !actions.includes(action)) {
      return `Unknown action! Please use one of the following: ${actions.join(
        ', '
      )}`
    }

    const member = await interaction.options.getMember('user');
    const memberId = member.id // args.shift().replace(/[<@!&>]/g, '');

    if (action === 'add') {
      fs.appendFileSync(path.resolve(`./gmuted.list`), `\n${memberId}`)
      
      return {
        custom: true,
        content: `Global muted ${memberId}`,
        ephemeral: true,
      }
      
      
    }

    if (action === 'remove') {
      fs.readFile('./gmuted.list', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return `<:Red_Error:1010468979535515648> Something went wrong`
          
          
        }
        const Ndata = data.replace(`\n${memberId}`, '');
        
        fs.writeFileSync(path.resolve(`./gmuted.list`), Ndata)
      });

      return {
        custom: true,
        content: `Removed global mute from ${memberId}`,
        ephemeral: true,
      }
      
      
    }

    if (action === 'has') {
      fs.readFile(path.resolve(`./gmuted.list`), 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return `<:Red_Error:1010468979535515648> Something went wrong`
          
          
        }
        if (data.includes(memberId)) {
          return {
            custom: true,
            content: `${member.tag} is global muted`,
            ephemeral: true,
          }
          
          
        } else {
          return {
            custom: true,
            content: `${member.tag} is not global muted`,
            ephemeral: true,
          }
          
          
        }
      });
    }
  },
}