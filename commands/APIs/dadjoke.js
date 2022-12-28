const axios = require('axios');
module.exports = {
    name: 'dadjoke',
    description: 'Fetches a joke from a dad joke API',
    category: 'APIs',

    slash: 'both',
    testOnly: true,

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',

    callback: ({ args }) => {
    // create a function to fetch X jokes from icanhazdadjoke API using axios
    const fetchJokes = (amount) => {
        const jokes = [];
        for (let i = 0; i < amount; i++) {
            const response = axios.get('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: 'application/json',
                },
            })
            .then(() => {
                console.log(':))')
            })
            .catch(() => {
                console.log(':((')
            })
            jokes.push(response);
        }
        return jokes;
    }

    const amount = args[0];
    const jokes = fetchJokes(amount);
    console.log(jokes);
    return 'Check your console!';
  }
}