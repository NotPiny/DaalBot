const axios = require('axios');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'define',
    description: 'Defines a word',
    category: 'Util',

    type: 'SLASH',

    testOnly: false,

    options: [
        {
            name: 'word',
            description: 'The word to define',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    callback: async ({ interaction }) => {
        try {
            const word = interaction.options.getString('word');
            const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
            const embed = new EmbedBuilder()
                .setTitle(`Definition of ${word}`)
                .addFields([
                    {
                        name: 'Definition',
                        value: `${data[0]?.meanings[0]?.definitions[0]?.definition}`,
                        inline: true
                    },
                    {
                        name: 'Example',
                        value: `${data[0]?.meanings[0]?.definitions[0]?.example ?? 'No example'}`,
                        inline: true
                    },
                    {
                        name: 'Pronounciation',
                        value: data[0]?.phonetics[0]?.audio ? `[${data[0]?.phonetics[0]?.text}](${data[0]?.phonetics[0]?.audio})` : data[0]?.phonetics[0]?.text ?? 'No known pronounciation',
                    }
                ])
                .setAuthor({
                    name: 'Data provided by dictionaryapi.dev',
                    iconURL: 'https://pinymedia.web.app/dictionaryapi.dev.png',
                    url: 'https://dictionaryapi.dev/'
                })
    
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch {
            interaction.reply({
                content: `Something went wrong while trying to define ${interaction.options.getString('word')} chances are this is because the api doesnt have a definition for this word yet.\nYou can try to [search it for yourself](<https://www.google.com/search?q=define+${interaction.options.getString('word')}>)`,
                ephemeral: true
            })
        }
    }
}