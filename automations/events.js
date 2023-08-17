const client = require('../client');
const fs = require('fs');
const path = require('path');
const daalbot = require('../daalbot.js');

client.on('messageCreate', async(message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;

    const eventList = fs.readFileSync(path.resolve('./db/automations/event.list'), 'utf8').split('\n').filter(line => line.startsWith('MESSAGECREATE'))[0].split(',')[1].split('|');
    const events = eventList.filter(event => event.split(';')[0] === message.channel.id);
    console.log(events) // Debug
    if (events.length === 0) return;

    events.forEach(async(event) => {
        /**
         * Format:
         * MESSAGE_CONTENT {Condition type} {Condition};{Condition type} {Condition};...
         * MESSAGE {Action} {Action data};{Action} {Action data};...
         */

        const eventContent = fs.readFileSync(path.resolve(`./db/automations/events/${event.split(';')[1]}.event`), 'utf8').split('\n');
        const conditions = eventContent[0].split('\n')[0].split(';');
        const actions = eventContent[1].split('\n')[1].split(';');

        conditions.forEach(async(condition) => {
            const conditionInput = condition.split(' ')[0];
            const conditionType = condition.split(' ')[1];
            const conditionData = condition.split(' ')[2].split('_').join(' ');

            if (conditionType.startsWith('EQUALS')) {
                const exactMatch = conditionType.split(':')[1] === 'true';

                if (exactMatch) {
                    if (conditionInput === 'MESSAGE_CONTENT') {
                        if (message.content === conditionData) {
                            actions.forEach(async(action) => {
                                const actionType = action.split(' ')[0];
                                const actionData = action.split(' ')[1];

                                if (actionType === 'SEND') {
                                    message.channel.send(actionData);
                                }
                            })
                        }
                    }
                } else {
                    if (conditionInput === 'MESSAGE_CONTENT') {
                        if (message.content.includes(conditionData)) {
                            actions.forEach(async(action) => {
                                const actionType = action.split(' ')[0];
                                const actionData = action.split(' ')[1];

                                if (actionType === 'SEND') {
                                    message.channel.send(actionData);
                                }
                            })
                        }
                    }
                }
            }
        })
    })
})