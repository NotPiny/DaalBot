const client = require('../../client.js');
const Discord = require('discord.js');
const csvman = require('@npiny/csvman');

client.on('messageCreate', async message => {
    // || !message.channel.id == '1015649845287075840'
    if (!message.guild.id == '1015322440152383539') return;
    if (message.author.bot) return;

    const command = message.content.toLowerCase().split(' ')[0].replace('$', '');

    if (command === 'ffembed') {
        if (!message.member.roles.cache.has('1178297437123780668')) return message.reply('You do not have permission to use this command.');

        const csvText = message.content.split(' ').slice(1).join(' ');
        const csvData = await csvman.tools.csvBuilder(csvText, '    ');

        const embed = new Discord.EmbedBuilder()

        embed.setAuthor({
            name: 'Feature Friday Playtesting',
            iconURL: `https://pinymedia.web.app/FCHQ.png`
        })

        let desc = '';

        /**
         * @type {string[][]}
         */
        let data = [];

        data.push(csvData.metadata.join('    '))

        csvData.data.forEach((row, i) => {
            data.push(row);
        })

        data = data.map(row => row.split('    '));

        data.forEach(map => {
            const mapCreator = map[0];
            const mapName = map[1];
            const mapCode = map[2];
            const playerCount = map[3];
            const testedBefore = map[4] === 'TRUE' ? 'Yes' : 'No';

            desc += `## ${mapName} - ${mapCreator}\n`
            desc += `Code: ${mapCode}\n`
            desc += `Players: ${playerCount}\n`
            desc += `Tested Before: ${testedBefore}\n\n`
        })

        embed.setDescription(desc)

        message.channel.send({
            content: `<@&1015702175361540147>`,
            embeds: [embed]
        })

        message.delete();
    }
})