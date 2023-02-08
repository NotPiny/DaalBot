const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

module.exports = {
    name: 'dashboard',
    description: 'Configure the dashboard for your account',
    category: 'Dashboard',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'account',
            description: 'Configure your dashboard account',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'create',
                    description: 'Create a new dashboard account',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'password',
                            description: 'The password for your dashboard account',
                            type: 'STRING',
                            required: true
                        }
                    ]
                }
            ]
        }
    ],

    callback: (interaction) => {
        const subCommandGroup = interaction.options.getSubcommandGroup();
        const subCommand = interaction.options.getSubcommand();

        if (subCommandGroup === 'account') {
            if (subCommand === 'create') {
                const password = interaction.options.getString('password');

                const options = {
                    method: 'POST',
                    url: 'https://api.daalbot.xyz/post/users/create',
                    
                    params: {
                        id: interaction.user.id,
                    },
    
                    headers: {
                        password: password,
                        createkey: process.env.DBAPI_CreateKey
                    }
                };

                axios.request(options)
                .then((response) => {
                    console.log(`Dashboard command > Create account > ${response.status}`)
                    if (response.status == 200) {
                        interaction.reply({
                            content: 'Your dashboard account has been created',
                            ephemeral: true
                        })
                    } else {
                        interaction.reply({
                            content: `An error occurred while creating your dashboard account (${response.status})`,
                            ephemeral: true
                        })
                    }
                })
            }
        }
    }
}