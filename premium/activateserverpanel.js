const client = require('../client.js');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

client.on('messageCreate', async(msg) => {
    if (msg.author.id !== config.users.piny || msg.channel.id !== '1111414992101724180') return;

    if (msg.content.toLowerCase() === '$summonpremiumactivatepanel') {
        const embed = new MessageEmbed()
            .setTitle('Activate a server')
            .setDescription('Upgrade your server with DaalBot Premium!\n\nElevate your Discord server with Daalbot Premium. Activate it now to unlock expanded limits and experience advanced customization, priority support, and stay ahead with future updates.')
            .setAuthor({
                name: 'DaalBot Premium',
                iconURL: client.user.displayAvatarURL()
            })

        const row = new MessageActionRow()
        
        const button = new MessageButton()
            .setCustomId('activate-premiumserver')
            .setLabel('Activate')
            .setStyle('SUCCESS')

        row.addComponents(button)

        msg.delete()
        msg.channel.send({ embeds: [embed], components: [row] })
    }
})

client.on('interactionCreate', (interaction) => {
    if (interaction.channel.id !== '1111414992101724180') return;

    if (interaction.isButton()) {
        if (interaction.customId === 'activate-premiumserver') {
            const embed = new MessageEmbed()
            .setTitle('Server Activation')
            .setDescription('Please select the server you want to activate.')
            .setAuthor({
                name: 'DaalBot Premium',
                iconURL: client.user.displayAvatarURL()
            })

            const row = new MessageActionRow()

            const select = new MessageSelectMenu()
                .setCustomId('select-premiumserver')
                .setPlaceholder('Select a server')
        
            const guilds = client.guilds.cache.filter(g => g.ownerId === interaction.user.id)

            guilds.forEach(guild => {
                select.addOptions({
                    label: guild.name,
                    value: guild.id
                })
            })

            row.addComponents(select)

            interaction.reply({ 
                embeds: [embed],
                components: [row],
                ephemeral: true
            })
        } else if (interaction.customId === 'confirm-premiumserver') {
            const embed = new MessageEmbed()
                .setTitle('Server Activated')
                .setDescription('Your server has been activated. Thank you for your support and enjoy your new features!')
                .setAuthor({
                    name: 'DaalBot Premium',
                    iconURL: client.user.displayAvatarURL()
                })
                .setFooter({
                    text: 'Nah fam the code to activate the server is not done yet'
                })
                .setColor('GREEN')

            interaction.update({ embeds: [embed], components: [] })
        } else if (interaction.customId === 'cancel-premiumserver') {
            const embed = new MessageEmbed()
                .setTitle('Server Activation')
                .setDescription('Server activation cancelled, no changes have been made.')
                .setAuthor({
                    name: 'DaalBot Premium',
                    iconURL: client.user.displayAvatarURL()
                })
                .setColor('RED')

            interaction.update({ embeds: [embed], components: [] })
        }
    } else if (interaction.customId === 'select-premiumserver' && interaction.isSelectMenu()) {
        const guild = client.guilds.cache.get(interaction.values[0])

        if (!guild) return interaction.reply({ content: 'That server does not exist!', ephemeral: true })

        const embed = new MessageEmbed()
            .setTitle('Server Activation')
            .setDescription(`Are you sure you want to activate **${guild.name} \`(${guild.id})\`**?`)
            .setAuthor({
                name: 'DaalBot Premium',
                iconURL: client.user.displayAvatarURL()
            })

        const row = new MessageActionRow()

        const button = new MessageButton()
            .setCustomId('confirm-premiumserver')
            .setLabel('Confirm')
            .setStyle('SUCCESS')

        const button2 = new MessageButton()
            .setCustomId('cancel-premiumserver')
            .setLabel('Cancel')
            .setStyle('DANGER')

        row.addComponents(button, button2)

        interaction.update({ 
            embeds: [embed],
            components: [row],
            ephemeral: true
        })
    }
})