module.exports = {
    name: 'test-embed',
    description: 'Testing new embeds',
    category: 'Message',

    slash: true,
    testOnly: true,

    callback: () => {
        console.log('WOKCommands has gotten the embed test command');
    }
}