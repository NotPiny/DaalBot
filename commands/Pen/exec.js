require('dotenv').config();
const daalbot = require('../../daalbot.js');
module.exports = {
    name: 'exec',
    description: 'Executes code in the current context (only for developers)',
    category: 'Pen',
    slash: true,
    options: [
        {
            name: 'code',
            description: 'The code to execute',
            type: 'STRING',
            required: true
        },
        {
            name: 'passcode',
            description: 'The passcode to execute the code',
            type: 'STRING',
            required: true
        }
    ],
    ownerOnly: true,

    callback: ({ message, args, client, interaction }) => {
        const code = interaction.options.getString('code');
        const passcode = interaction.options.getString('passcode');

        if (passcode !== process.env.execpass) return 'Invalid passcode';

        try {
            const result = eval(code);
            console.log(result);
            return {
                custom: true,
                content: 'Executing code...',
                ephemeral: true
            }
        } catch (err) {
            return err;
        }
    }
}