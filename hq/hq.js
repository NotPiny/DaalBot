const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = require('../client');
const daalbot = require('../daalbot.js');
require('./twitter');
function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
    console.log(text);
  };

client.on('ready', () => {
    const server = client.guilds.cache.get('1001929445478781030');
    const commands = server?.commands

    commands?.create({
        name: 'suggest',
        description: 'Suggest a feature for the bot',
        options: [
            {
                name: 'suggestion',
                description: 'The suggestion',
                type: 3,
                required: true
            }
        ]
    })
})


client.on('guildMemberAdd', member => {
    if (member.guild.id === '1001929445478781030') {
    const welcomeEmbed = new MessageEmbed()
    .setTitle(`Welcome to the official DaalBot HQ!`)
    .setDescription(`You are member #${member.guild.memberCount}`)
    .setThumbnail(member.avatarURL)
    .setImage('https://pinymedia.web.app/Daalbot.png')
    .setColor(0x9b24a9)
    client.channels.cache.find(channel => channel.id === '1010452045163143209').send({ content: `Everyone welcome <@${member.id}> to the server!`, embeds: [welcomeEmbed]});
    } else {
        return;
    }
});

client.on('guildMemberRemove', member => {
    if (member.guild.id === '1001929445478781030') {
        client.channels.cache.find(channel => channel.id === '1010452094844665906').send(`<@${member.id}> has left the server`);
    } else {
        return;
    }
});

client.on('messageCreate', msg => {
    if (msg.guild.id === '1001929445478781030') {
        if (msg.author.bot && msg.author.id == '1052298562458898462') {
            // Triggers when a commit alert is sent by the webhook
            const data = msg.content.split(':')
            const commitEmbed = new MessageEmbed()
                .setTitle(`New commit by ${data[0]} to ${data[2]}`)
                .setDescription(data[1])
                .setURL(data[3].replace(/commit/g, ' TRUE ').includes('TRUE') ? `${data[3]}` : `https://github.com/${data[2]}`)

            msg.delete();
            daalbot.getChannel(msg.guild.id, '1052304271221198898').send({ embeds: [commitEmbed] });
        } else if (msg.author.bot && msg.author.id == '1055877624230068315') {
            msg.channel.send('<@&1016344487867457597>')
        }
    } else {
        return;
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.guildId === '1001929445478781030') return;
    if (interaction.isButton()) {
        const ID = interaction.customId;

        if (ID === 'hq-suggestion-approve') {
            interaction.reply({
                content: 'Suggestion has been approved!',
                ephemeral: true
            })

            daalbot.getChannel('1001929445478781030', '1003825539766820904').send(`Suggestion "${interaction.message.embeds[0].description}" by ${interaction.message.embeds[0].title.replace(/Suggestion from /, '')}\nwas approved by <@${interaction.user.id}>`);
        }

        if (ID === 'hq-suggestion-deny') {
            interaction.reply({
                content: 'Suggestion has been denied!',
                ephemeral: true
            })
        }
    }

    if (interaction.isCommand()) {
        if (interaction.commandName === 'suggest') {
            const suggestion = interaction.options.getString('suggestion');
            const Embed = new MessageEmbed()
            .setTitle(`Suggestion from ${interaction.user.tag}`)
            .setDescription(`${suggestion}`)
            .setColor(0xae00ff)

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('hq-suggestion-approve')
                .setLabel('Approve')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('hq-suggestion-deny')
                .setLabel('Deny')
                .setStyle('DANGER')
            )
            client.channels.cache.find(channel => channel.id === '1004505732512747583').send({
                embeds: [Embed],
                components: [row]
            })
            interaction.reply('Suggestion has been sent!')
        }
    }
})