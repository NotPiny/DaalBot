module.exports = {
    category: 'Testing',
    description: 'Runs the current console based command being tested',
  
    slash: true,
    testOnly: true,

        minArgs: 1,
        maxArgs: 2,
        expectedArgs: '<text> <txt>',
        expectedArgsTypes: ['STRING', 'STRING'],

        options: [
            {
              name: 'text',
              description: `The text to send to the console`,
              type: 'STRING',
              required: true,
            },
            {
              name: 'txt',
              description: 'Secondary text field',
              type: 'STRING',
              required: false,
            }
        ],
  
    callback: (interaction) => {
      const text = interaction.options.getString('text');
      const txt = interaction.options.getString('txt');
      console.log(`fetched data: ${text}, ${txt}`);
      return 'Check console'
      
      
    },
  }