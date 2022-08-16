const categorys = ['Moderation', 'Testing']
const { MessageEmbed } = require('discord.js')
module.exports = {
     category: 'Help', 
     description: 'Brings up the help menu for the bot',

     slash: true,
     testOnly: true,

     options: [
      {
         name: 'category',
         description: 'the category to bring up commands for',
         type: 'STRING',
         required: true,
         choices: categorys.map((action) => ({
            name: action,
            value: action,
          })),
      }
     ],

     callback: ( interaction ) => {
      const action = args.shift()
      if (!action || !categorys.includes(action)) {
        return `Unknown category! Please use one of the following: ${categorys.join(
          ', '
        )}`
      } else {
      const Embed = new MessageEmbed()
      .setTitle(action)
      
      if (action === 'Moderation') {
         Embed.setDescription('/warn\n/ban\n/kick')
      } else {
         if (action === 'Testing') {
            Embed.setDescription('/ping\n/crashtest\n/testbot')
         }
      }

          return Embed;
        }
     },
}