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
    //     let i = parseInt(args.shift())
    //     async function fetchJoke() {
    //         const response = await fetch("http://icanhazdadjoke.com", {
    //             headers: {
    //                 Accept: "text/plain",
    //             },
    //         });
    //         return response
    //     }

    //     let text

    //     while (i > 0) {
    //         text += `${fetchJoke()}\n`
    //         i = i - 1
    //     }
    }
}