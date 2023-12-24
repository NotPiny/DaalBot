const client = require('../../client.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');

/**
 * @param {string} type
 * @param {string} input 
 * @param {DJS.Message} oldMessage
 * @param {DJS.Message} newMessage
 * @param {string} value
 * @param {boolean} inverted
 * @param {boolean} caseSensitive
 * 
 * @returns {boolean}
 */
function matchesCondition(type, input, oldMessage, newMessage, value, inverted, caseSensitive) {
    const variables = [
        {
            name: 'NEWMSG_CONTENT',
            value: newMessage.content
        },
        {
            name: 'OLDMSG_CONTENT',
            value: oldMessage.content
        },
        {
            name: 'AUTHOR_ID',
            value: newMessage.author.id
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
 * @param {DJS.Message} message
 * @param {string} value
 * 
 * @returns {void}
*/
function executeAction(type, message, value) {
    const variables = [
        {
            name: 'MSG_CONTENT',
            value: message.content
        },
        {
            name: 'AUTHOR_ID',
            value: message.author.id
        }
    ]

    let valueData = value;

    variables.forEach(v => {
        valueData = valueData.replace(`{${v.name}}`, v.value);
    })

    switch (type.toLowerCase()) {
        case 'reply':
            message.reply(valueData);
            break;
        case 'send':
            message.channel.send(valueData);
            break;
        case 'addrole':
            message.member.roles.add(daalbot.getRole(message.guild.id, valueData));
            break;
        case 'removerole':
            message.member.roles.remove(daalbot.getRole(message.guild.id, valueData));
            break;
        case 'delete':
            message.delete();
            break;
    }
}

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    const eventsFile = JSON.parse(fs.readFileSync(path.resolve('./db/events/events.json'), 'utf8'));
    const matchingEvents = eventsFile.filter(e => e.guild === oldMessage.guild.id && e.channel === oldMessage.channel.id && e.on === 'messageUpdate');

    if (matchingEvents.length === 0) return; // No events to trigger so we can stop here

    try {
        matchingEvents.forEach(async (event) => {
            try {
                const conditions = event.conditions;
        
                let conditionsMet = true;
                conditions.forEach(c => {
                    if (!matchesCondition(c.type, c.input, oldMessage, newMessage, c.value, c.inverted, c.caseSensitive)) {
                        conditionsMet = false; // If any condition is not met, the event is not triggered
                    }
                })
        
                if (conditionsMet) {
                    const actions = event.actions;

                    actions.forEach(a => {
                        executeAction(a.type, newMessage, a.value);
                    })
                }
            } catch (error) {
                console.error(`Error executing event ${event.id} in guild ${oldMessage.guild.id} on ${event.on}: ${error}`)
                const embed = new DJS.EmbedBuilder()
                    .setTitle('Error')
                    .setDescription(`An error occurred while trying to execute a custom event.`)
                    .setColor('Red')
                    .setTimestamp()
                    .setFooter({
                        text: `Event ID: ${event.id} | Channel: ${oldMessage.channel.id}`
                    })
                daalbot.guilds.sendAlert(oldMessage.guild.id, embed, `Error executing custom event. Event ID: ${event.id}`)
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
                text: `Event ID: Unknown | Channel: ${oldMessage.channel.id}`
            })
        daalbot.guilds.sendAlert(oldMessage.guild.id, embed, 'Error executing custom event.')
    }
})