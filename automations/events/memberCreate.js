const client = require('../../client.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');

/**
 * 
 * @param {DJS.Guild} guild 
 * @param {*} event 
 * @param {*} error 
 */
function sendErrorAlert(guild, event, error) {
    const embed = new DJS.EmbedBuilder()
        .setTitle('Error')
        .setDescription(`An error occurred while trying to execute a custom event.\n\n\`\`\`\n${error}\n\`\`\``)
        .setColor('Red')
        .setTimestamp()
        .setFooter({
            text: `Event ID: ${event.id} | Guild: ${guild.id}`
        })
    daalbot.guilds.sendAlert(guild.id, embed, `Error executing custom event. Event ID: ${event.id}`)
}

/**
 * @param {string} type
 * @param {string} input 
 * @param {DJS.GuildMember} member
 * @param {string} value
 * @param {boolean} inverted
 * @param {boolean} caseSensitive
 * 
 * @returns {boolean}
 */
function matchesCondition(type, input, member, value, inverted, caseSensitive) {
    const variables = [
        {
            name: 'USER_ID',
            value: member.id
        },
        {
            name: 'TIME_JOINED',
            value: member.joinedTimestamp
        },
        {
            name: 'MEMBER_DISPLAYNAME',
            value: member.displayName
        },
        {
            name: 'MEMBER_USERNAME',
            value: member.user.username
        },
        {
            name: 'MEMBER_TAG',
            value: member.user.tag
        },
        {
            name: 'USER_JOINED',
            value: member.user.createdTimestamp
        }
    ]

    let output = false;

    const inputData = variables.find(v => v.name === input).value;
    if (!inputData) output = false;
    if (caseSensitive) value = value.toLowerCase()

    switch (type.toLowerCase()) {
        case 'startswith':
            output = inputData.startsWith(value);
            break;
        case 'endswith':
            output = inputData.endsWith(value);
            break;
        case 'contains':
            output = inputData.includes(value);
            break;
        case 'equals':
            output = inputData === value;
            break;
        case 'matches':
            output = inputData.match(new RegExp(value, 'g'));
            break;
    }

    if (inverted) output = !output;

    return output;
}

/**
 * @param {string} type
 * @param {DJS.GuildMember} member
 * @param {string} value
 * @param {any} event
 * 
 * @returns {void}
*/
function executeAction(type, member, value, event) {
    const variables = [
        {
            name: 'USER_ID',
            value: member.id
        },
        {
            name: 'TIME_JOINED',
            value: member.joinedTimestamp
        },
        {
            name: 'MEMBER_DISPLAYNAME',
            value: member.displayName
        },
        {
            name: 'MEMBER_USERNAME',
            value: member.user.username
        },
        {
            name: 'MEMBER_TAG',
            value: member.user.tag
        },
        {
            name: 'USER_JOINED',
            value: member.user.createdTimestamp
        }
    ]

    let valueData = value;

    variables.forEach(v => {
        valueData = valueData.replace(`{${v.name}}`, v.value);
    })

    switch (type.toLowerCase()) {
        case 'dm':
            member.send(valueData);
            break;
        case 'reply_to_welcome_message':
            if (member.guild.systemChannel) {
                member.guild.systemChannel.messages.fetch().then(messages => {
                    const welcomeMessage = messages.find(m => m.author.id === member.id);
                    if (welcomeMessage) {
                        welcomeMessage.reply(valueData);
                    } else {
                        member.guild.systemChannel.send(valueData); // Fallback for if discords "Welcome to the server {name}" message is disabled / missing
                    }
                })
            } else {
                sendErrorAlert(member.guild, event, 'No system channel found, Please set one in your server settings.')
            }
            break;
    }
}

client.on('guildMemberAdd', async (member) => {
    if (member.bot) return;

    const eventsFile = JSON.parse(fs.readFileSync(path.resolve('./db/events/events.json'), 'utf8'));
    const matchingEvents = eventsFile.filter(e => e.guild === member.guild.id && e.on === 'memberCreate');

    if (matchingEvents.length === 0) return; // No events to trigger so we can stop here

    try {
        matchingEvents.forEach(async (event) => {
            try {
                const conditions = event.conditions;
        
                let conditionsMet = true;
                conditions.forEach(c => {
                    if (!matchesCondition(c.type, c.input, member, c.value, c.inverted)) {
                        conditionsMet = false; // If any condition is not met, the event is not triggered
                    }
                })
        
                if (conditionsMet) {
                    const actions = event.actions;

                    actions.forEach(a => {
                        executeAction(a.type, member, a.value, event);
                    })
                }
            } catch (error) {
                console.error(`Error executing event ${event.id} in guild ${member.guild.id} on ${event.on}: ${error}`)
                const embed = new DJS.EmbedBuilder()
                    .setTitle('Error')
                    .setDescription(`An error occurred while trying to execute a custom event.`)
                    .setColor('Red')
                    .setTimestamp()
                    .setFooter({
                        text: `Event ID: ${event.id} | Channel: ${member.channel.id}`
                    })
                daalbot.guilds.sendAlert(member.guild.id, embed, `Error executing custom event. Event ID: ${event.id}`)
            }
        })
    } catch (error) {
        console.error(error)
        const embed = new DJS.EmbedBuilder()
            .setTitle('Error')
            .setDescription(`An error occurred while trying to execute a custom event.`)
            .setColor('Red')
            .setTimestamp()
            .setFooter({
                text: `Event ID: Unknown | Channel: ${member.channel.id}`
            })
        daalbot.guilds.sendAlert(member.guild.id, embed, 'Error executing custom event.')
    }
})