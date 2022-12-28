module.exports = {
    category: 'Utility',
    description: 'Decodes a bit of text',

    slash: true,
    testOnly: false,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'base64',
            description: 'encodes text into base64',
            options: [
                {
                    name: 'text',
                    description: 'the text to decode',
                    type: 'STRING',
                    required: true
                }
            ],
        }
    ],

    callback: ({ interaction }) => {
        const subCommand = interaction.options.getSubcommand();
        const text = interaction.options.getString('text');

        function decodeB64(text) {
            let data = text;
            let buff = new Buffer(data, 'base64');
            let output = buff.toString('ascii');

            return output;
        }

        if (subCommand === 'base64') {
            const result = decodeB64(text)
            interaction.reply({ content: `Result: \n${result}` })
          .then(() => { console.log(':)') })
          .catch(() => { console.log('bruh') })
        }
    }
}