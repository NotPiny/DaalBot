const actions = ['exit', 'undefined']

module.exports = {
  category: 'Configuration',
  description: 'Crashes the bot for debugging',

  permissions: ['MANAGE_ROLES'],

  minArgs: 1,
  expectedArgs: `<"${actions.join('", "')}">`,

  slash: true,
  testOnly: true,
  guildOnly: true,

  options: [
    {
      name: 'method',
      description: `The crash to perform. One of: ${actions.join(', ')}`,
      type: 'STRING',
      required: true,
      choices: actions.map((action) => ({
        name: action,
        value: action,
      })),
    }
  ],

  callback: ({ guild, args, client }) => {
    const action = args.shift()
    if (!action || !actions.includes(action)) {
      return `Unknown action! Please use one of the following: ${actions.join(
        ', '
      )}`
    }

    if (action === 'exit') {
        console.log(`|---------------|`);
        console.log(`|  Process.exit |`);
        console.log(`|has been called|`);
        console.log(`|---------------|`);
        process.exit();
    }

    if (action === 'undefined') {
        const TJK = actions.till
    }

    return 'Unknown action'
  },
}