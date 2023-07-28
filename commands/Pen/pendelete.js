module.exports = {
    name: 'pendelete',
    category: 'Pen',
    description: 'Deletes a channel for quick purging',
    
    slash: false,
    ownerOnly: true,

    callback: async ({ message }) => {
        message.channel.delete();
    }
}