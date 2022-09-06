// JAVASCRIPT:
const actions = ['add', 'remove', 'has'];
const fs = require('fs');
const { botPath } = require('../../config.json');

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

    const memberId = args.shift().replace(/[<@!&>]/g, '');
    const member = await interaction.options.getMember('user');

    if (action === 'add') {
      fs.appendFile(`${botPath}/gmuted.list`, `\n${memberId}`, function (err) {
        if (err) throw err;
      });
      
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
        const regex = new RegExp(memberId);
        const Ndata = data.replace(regex, "REMOVED");
        
        fs.writeFile(`${botPath}/gmuted.list`, Ndata, err => {
          if (err) {
            console.log(err);
            return `<:Red_Error:1010468979535515648> Something went wrong`
            
            
          }
        });
      });

      return {
        custom: true,
        content: `Removed global mute from ${memberId}`,
        ephemeral: true,
      }
      
      
    }

    if (action === 'has') {
      fs.readFile('./gmuted.list', 'utf8', (err, data) => {
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