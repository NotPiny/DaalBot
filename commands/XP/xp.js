const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot');

module.exports = {
    name: 'xp',
    description: 'Modfies the XP of a user',
    category: 'XP',

    slash: true,
    requireRoles: true,

    guildOnly: true,
    testOnly: false,

    options: [
        {
            name: 'user',
            description: 'The user to modify the XP of',
            type: 'USER',
            required: true
        },
        {
            name: 'amount',
            description: 'The amount of XP',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'action',
            description: 'The action to perform',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Add',
                    value: 'add'
                },
                {
                    name: 'Remove',
                    value: 'remove'
                },
                {
                    name: 'Set',
                    value: 'set'
                }
            ]
        }
    ],

    callback: ({ interaction }) => {
        // Looks strange by here but its just for intellisense
        const user = interaction.options.getUser('user')
        const amount = parseInt(`${interaction.options.getInteger('amount')}`)
        const action = `${interaction.options.getString('action')}`

        // Check if the user is a bot
        if (user.bot) return interaction.reply({ content: `<@${user.id}> is a bot and is not have a level`, ephemeral: true });

        if (action === 'add') {
            // Check if the user has a XP file
            if (fs.existsSync(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`))) {
                // Read the XP file
                let xp = parseInt(fs.readFileSync(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), 'utf8'));
                // Add the XP
                xp += amount;
                // Write the XP file
                fs.writeFileSync(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), `${xp}`);
                // Reply
                interaction.reply({ content: `Added ${amount} XP to <@${user.id}>`, ephemeral: true });
            } else {
                // Just set it if it doesnt exist

                // Save it
                daalbot.fs.write(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), `${amount}`);

                // Reply
                interaction.reply({ content: `Added ${amount} XP to <@${user.id}>`, ephemeral: true });
            }
        } else if (action === 'set') {
            // Save it
            daalbot.fs.write(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), `${amount}`);

            // Reply
            interaction.reply({ content: `Added ${amount} XP to <@${user.id}>`, ephemeral: true });
        } else if (action === 'remove') {
            // Check if the user has a XP file
            if (fs.existsSync(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`))) {
                // Read the XP file
                let xp = parseInt(fs.readFileSync(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), 'utf8'));
                
                // Remove the XP
                xp -= amount;

                // Write the XP file
                daalbot.fs.write(path.resolve(`./db/xp/${interaction.guild.id}/${user.id}.xp`), xp < 0 ? `0` : `${xp}`);

                // Reply
                interaction.reply({ content: `Removed ${amount} XP from <@${user.id}>`, ephemeral: true });
            }
        }
    }
}