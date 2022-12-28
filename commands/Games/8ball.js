const outcomes = [
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Maybe",
    "No",
    "Nope",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
];

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question',
    slash: true,
    testOnly: true,
    category: 'games',
    options: [
        {
            name: 'question',
            description: 'The question you want to ask the magic 8ball',
            type: 'STRING',
            required: true
        }
    ],

    callback: ({ interaction, args }) => {
        const question = interaction.options.getString('question')
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]
        return `**Question:** ${question}\n\n**Answer:** ${outcome}`
    }
}