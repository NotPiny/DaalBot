const client = require('../../../client.js');
const config = require('../../../config.json');
const DJS = require('discord.js');

client.on('messageCreate', (msg) => {
    if (msg.author.id === config.users.piny) {
        if (msg.content.toLowerCase().startsWith('$summonteamhealth')) {
            const embed = new DJS.MessageEmbed()
                .setTitle('Team Health')
                .setDescription('I\'m working 24/7 to make sure that the team is running smoothly and everyone is having the best possible experience on the team. But to do that I need **YOUR** help\n> Every week the team will be asked to vote on the health of the team in its current state, you can choose to do this any time but you\'ll never be required to.\n> \n> **1 - Terrible**\n> **9 - Perfect**')

            const row1 = new DJS.MessageActionRow()
            const row2 = new DJS.MessageActionRow()
            const row3 = new DJS.MessageActionRow()

            const button1 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-1')
                .setLabel('1')
                .setStyle('PRIMARY')

            const button2 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-2')
                .setLabel('2')
                .setStyle('PRIMARY')

            const button3 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-3')
                .setLabel('3')
                .setStyle('PRIMARY')

            const button4 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-4')
                .setLabel('4')
                .setStyle('PRIMARY')
            
            const button5 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-5')
                .setLabel('5')
                .setStyle('PRIMARY')

            const button6 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-6')
                .setLabel('6')
                .setStyle('PRIMARY')
            
            const button7 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-7')
                .setLabel('7')
                .setStyle('PRIMARY')

            const button8 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-8')
                .setLabel('8')
                .setStyle('PRIMARY')

            const button9 = new DJS.MessageButton()
                .setCustomId('vortex-teamhealth-9')
                .setLabel('9')
                .setStyle('PRIMARY')

            row1.addComponents(button1, button2, button3)
            row2.addComponents(button4, button5, button6)
            row3.addComponents(button7, button8, button9)

            msg.channel.send({
                embeds: [embed],
                components: [row1, row2, row3]
            })
        }
    }
})