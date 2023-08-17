const client = require('../../client.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const daalbot = require('../../daalbot.js');

client.on('guildMemberAdd', member => {
    if (member.guild.id === '973711816226136095') {
        // Ping the user in the rules channel
        const RulesChannel = daalbot.getChannel('973711816226136095', config.servers.vortex.channels.rules)

        // Send the message
        RulesChannel.send(`<@${member.user.id}>`)
            .then(msg => {
                // Delete the message after 1 second
                setTimeout(() => {
                    msg.delete();
                }, 1000);
            })

        // Send the welcome message in the user's DMs
        const WelcomeMessage = new EmbedBuilder()
            .setColor('#00aae3')
            .setTitle('Welcome to Vortex  HQ!')
            .setDescription(`> __Please be sure to follow both ours, and Discord rules.__
> 
> ***Discord TOS -*** https://discord.com/terms
> ***Discord Community Guidelines -*** https://discord.com/guidelines
> 
> **__RULES__**
> 
> ***Spam -*** Please refrain from pinging members or roles unnecessarily. Don’t spam in the chat, or voice chat. Try to use appropriate channels when starting a conversation.
> 
> ***Drama -*** Please refrain from starting or involving yourself in drama. This server is created to help support creators and give a place for you to comfortably stay up to date with Vortex. Remember to think before speaking!
> 
> ***Harassment and Respect -*** Be respectful to others and their creations. Any instances of hate speech, including bullying, harassment, and racism will be removed.
> 
> ***Self-Promotion -*** Don’t self-promote yourself where it’s not appropriate. If you're looking to promote your stuff do so in ⁠#promo.
> 
> ***NSFW or Inappropriate Behavior -*** Don’t post graphic content, including images, text, or audio. The use of vulgar language is quite lenient, but swear words used to attack others, racial slurs, and derogatory terms are going too far, Vortex is an international team and certain team members and server members may take offence to language.
> 
> ***Use of Language -*** Our team is diverse and has people of many cultures, races and languages. But due to the fact that our team is mainly English it is difficult for moderators to moderate chats when people speak other languages. So for the sake of making our moderators jobs easier we ask that you only speak English within the server.
> 
> *These rules are discretionary, staff may choose to enforce punishment if they find someone’s behavior is inappropriate.*`)
            .setImage('https://pinymedia.web.app/VortexExpanded.png')
            .setThumbnail('https://pinymedia.web.app/VortexIcon.png')
            .setURL('https://www.vortexfnc.com')

        try {
            member.send({ embeds: [WelcomeMessage] });
        } catch (err) {
            // If this happens its probably because the user has DMs disabled
        }
    }
})