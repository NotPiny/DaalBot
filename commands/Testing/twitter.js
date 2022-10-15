module.exports = {
    name: 'twitter',
    description: 'Modify the twitter feed or whatever you should not see this description',
    category: 'Utility',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    guildOnly: true,

//     options: [
//         {
//             name: 'feed',
//             description: 'Modify the twitter feed',
//             type: 'SUB_COMMAND_GROUP',
//             options: [
//                 {
//                     name: 'add',
//                     description: 'Add a twitter feed',
//                     type: 'SUB_COMMAND',
//                     options: [
//                         {
//                             name: 'channel',
//                             description: 'The channel to send the feed to',
//                             type: 'CHANNEL',
//                             required: true
//                         },
//                         {
//                             name: 'account',
//                             description: 'The twitter account to add',
//                             type: 'STRING',
//                             required: true
//                         },
//                         {
//                             name: 'ping',
//                             description: 'The role to ping when a tweet is sent',
//                             type: 'ROLE',
//                             required: false
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
}