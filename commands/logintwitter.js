module.exports = {
    category: 'Other',
    description: "Brings up the bots twitter login",

    slash: true,
    testOnly: false,
    guildOnly: true,
    ownerOnly: true,

    callback: () => {
        return `This command has been scrapped`
    }
}