const fs = require('fs');

module.exports = {
    category: 'Other',
  description: 'Messages a user from the bots account',

  permissions: ['ADMINISTRATOR'],

  slash: true,
  testOnly: false,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <text>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback: ({ message, interaction, args, user }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember('user'))
    if (!target) {
      return 'Please tag someone to message'
    }

    args.shift()
    const text = args.join(' ')
    const sendText = text.replace(/<nl>/g, "\n");

    target.send(sendText)
    .catch(() => { 
      return 'Something went wrong :('
     });

    console.log(`\n---A user (${user.id}) has sent a message to "${target.id}" with the text "${sendText}"---\n`)
    // fs.appendFile('./logs/sendmsg.txt', `\n---A user (${user.id}) has sent a message to "${target.id}" with the text "${sendText}"---\n`, function (err) {
    //   if (err) {
    //     console.error()
    //   }
    //   console.log('Logged!');
    // });
    return {
      custom: true,
      content: `Sent message to <@${target.id}>`,
      ephemeral: true,
    }
  },
}