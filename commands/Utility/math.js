module.exports = {
    category: 'Utility',
    description: 'Performs math then returns the output',

    slash: true,
    testOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Adds to numbers together',
            options: [
                {
                    name: 'num1',
                    description: 'The first number',
                    type: 'INTEGER',
                    required: true,
                },
                {
                    name: 'num2',
                    description: 'The second number',
                    type: 'INTEGER',
                    required: true,
                },
            ]
        }
    ],

    callback: ({ args, interaction }) => {
        const subCommand = interaction.options.getSubcommand();
        const num1 = interaction.options.getNumber('num1')
        const num2 = interaction.options.getNumber('num2')

        if (subCommand === 'add') {
            const output = num1 + num2
            return output
            
            
        }
    }
}