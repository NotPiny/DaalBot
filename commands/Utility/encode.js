module.exports = {
    category: 'Utility',
    description: 'Encodes a bit of text',

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
                    description: 'the text to encode',
                    type: 'STRING',
                    required: true
                }
            ],
        }
    ],

    callback: ({ interaction }) => {
        const subCommand = interaction.options.getSubcommand();
        const text = interaction.options.getString('text');

        function encodeB64(text) {
            let data = text;
            let buff = new Buffer(data);
            let base64data = buff.toString('base64');

            return base64data;
        }

        if (subCommand === 'base64') {
            const result = encodeB64(text)
            interaction.reply({ content: `Result: \n${result}` })
            .then(() => { console.log(':)') })
            .catch(() => { console.log('bruh') })   
        }
    }
}