// JAVASCRIPT IMPORTS:
const axios = require('axios')

module.exports = {
  category: 'Testing',
  description: 'Example of a GET request',

  slash: true,
  testOnly: true,
  
  options: [
    {
      type: "SUB_COMMAND",
      name: "get",
      description: "Sends a get request to the API"
    },
    {
      type: "SUB_COMMAND",
      name: "post",
      description: "Sends a post request to the API"
    },
  ],

  callback: async ({ interaction }) => {
    const subCommand = await interaction.options.getSubcommand();
    let uri = 'https://jsonplaceholder.typicode.com/posts';

    if (subCommand === 'get') {
        const { data } = await axios.get(uri);
        console.log(data)
        return 'Check Console!'
        
        
    } else {
        if (subCommand === 'post') {
            const { data } = await axios.post(
                'https://jsonplaceholder.typicode.com/posts',
                {
                  title: 'foo',
                  body: 'bar',
                  userId: 1,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
            console.log(data)
            return 'Check Console!'
            
            
        }
    }
  },
}