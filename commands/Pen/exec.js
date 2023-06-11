require('dotenv').config();
const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');
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
        }
    ],
    ownerOnly: true,

    callback: ({ interaction }) => {
        const code = interaction.options.getString('code');

        if (interaction.user.id !== daalbot.config().users.piny) {
            return {
                custom: true,
                content: 'You are not allowed to use this command.',
                ephemeral: true
            }
        }

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