const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../client');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');
function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
    console.log(text);
};

/**
 * @param {string} user 
 * @param {boolean} premium 
 * @returns {void}
 */
function updatePremiumStatus(user, premium) {
    const premiumRole = client.guilds.cache.get('1001929445478781030').roles.cache.find(role => role.id === '1166772281029173389');
    const member = client.guilds.cache.get('1001929445478781030').members.cache.find(member => member.id === user);

    if (premium) {
        member.roles.add(premiumRole);
    } else {
        member.roles.remove(premiumRole);
    }

    /**
     * @type {users: {id: string, boosts: number, servers_activated: number, servers: string[]}[], guilds: {id: string, activatedBy: string}[]}
    */
    const premiumJson = JSON.parse(fs.readFileSync(path.resolve('./db/premium.json'), 'utf8'));
    const premiumUser = premiumJson.users.find(user => user.id === member.id);

    if (!premiumUser) {
        premiumJson.users.push({
            id: member.id,
            boosts: 1,
            servers_activated: 0,
            servers: []
        })

        fs.writeFileSync(path.resolve('./db/premium.json'), JSON.stringify(premiumJson, null, 4));
    } else {
        if (premium) {
            premiumUser.boosts++;
        } else {
            premiumUser.boosts--;
        }

        fs.writeFileSync(path.resolve('./db/premium.json'), JSON.stringify(premiumJson, null, 4));
    }
}

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
        const welcomeEmbed = new EmbedBuilder()
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

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (newMember.guild.id === '1001929445478781030') {
        // Premium

        // Boost detection
        const oldBoosts = oldMember.premiumSinceTimestamp;
        const newBoosts = newMember.premiumSinceTimestamp;

        const type = newMember.guild.premiumSubscriptionCount > oldMember.guild.premiumSubscriptionCount ? 'boost' : 'unboost';

        if (type === 'boost') {
            const boostEmbed = new EmbedBuilder()
                .setTitle(`Thanks for boosting the server!`)
                .setDescription(`Thanks for boosting the server, <@${newMember.id}>!`)
                .setColor(0x9b24a9)
            client.channels.cache.find(channel => channel.id === '1010452045163143209').send({ embeds: [boostEmbed] });

            updatePremiumStatus(newMember.id, true);
        }

        if (oldBoosts !== null && newBoosts === null) {
            updatePremiumStatus(newMember.id, false);
        }
    } else {
        return;
    }
})

client.on('messageCreate', msg => {
    if (msg.guild.id === '1001929445478781030') {
        if (msg.author.bot && msg.author.id == '1052298562458898462') {
            // Triggers when a commit alert is sent by the webhook
            const data = msg.content.split(':')
            const commitEmbed = new EmbedBuilder()
                .setTitle(`New commit by ${data[0]} to ${data[2]}`)
                .setDescription(data[1])
                .setURL(data[3].replace(/commit/g, ' TRUE ').includes('TRUE') ? `${data[3]}` : `https://github.com/${data[2]}`)

            msg.delete();
            daalbot.getChannel(msg.guild.id, '1052304271221198898').send({ embeds: [commitEmbed] });
        } else if (msg.author.bot && msg.author.id == '1055877624230068315') {
            msg.channel.send('<@&1016344487867457597>')
        } else if (msg.channel.id == '1003822202413662248') {
            msg.crosspost(); // Publish the message when it is sent in announcements
        }

        if (msg.content.toLowerCase().startsWith('$sendmsg') && msg.author.id === '900126154881646634') {
            const messageJson = JSON.parse(msg.content.replace(/\$sendmsg /g, '').replace(/['`]/g, '"').replace('{{DB_PURPLE}}', '10167465'));

            msg.delete();

            msg.channel.send(messageJson);
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
            const Embed = new EmbedBuilder()
            .setTitle(`Suggestion from ${interaction.user.tag}`)
            .setDescription(`${suggestion}`)
            .setColor(0xae00ff)

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('hq-suggestion-approve')
                .setLabel('Approve')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('hq-suggestion-deny')
                .setLabel('Deny')
                .setStyle(ButtonStyle.Danger)
            )
            client.channels.cache.find(channel => channel.id === '1004505732512747583').send({
                embeds: [Embed],
                components: [row]
            })
            interaction.reply('Suggestion has been sent!')
        }
    }
})

