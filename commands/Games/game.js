const quiz = require('./json/trivia.json');
module.exports = {
    category: 'Games',
    description: 'Launches a game',

    slash: true,
    testOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'trivia',
            description: 'Launches the bots built in trivia game'
        }
    ],

    callback: ({ interaction }) => {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'trivia') {
//             for (let i = 0; i < quiz.length; i++) {
//                 // TODO
//               }

// const item = quiz[Math.floor(Math.random() * quiz.length)];
// const filter = response => {
// 	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
// };

// interaction.reply({ content: item.question, fetchReply: true })
// 	.then(() => {
// 		interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
// 			.then(collected => {
// 				interaction.followUp(`${collected.first().author} got the correct answer!`);
// 			})
// 			.catch(collected => {
// 				interaction.followUp('Looks like nobody got the answer this time.');
// 			});
// 	});
        }
    }
}