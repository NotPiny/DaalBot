// Create a command to list all commands from the root/commands folder and subfolders in a embed message

const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const { botPath } = require("../../config.json");

module.exports = {
    name: "cmds",
    description: "Bring up a list of all commands",
    category: "Help",
    testOnly: false,
    ownerOnly: false,
    slash: true,

    callback: async ({ interaction, client }) => {
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({
                name: `${client.user.username} Commands`,
                icon_url: client.user.displayAvatarURL({ dynamic: true })
            })
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                icon_url: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp();

            let commandsArray = [];
            let commands = readdirSync(`${botPath}/commands`);

            commands.forEach(file => {
                const folderName = `${botPath}/commands/${file}/`;
                const command = readdirSync(folderName).filter(file => file.endsWith(".js"));

                command.forEach(file => {
                    const commandName = file.split(".")[0];
                    const command = require(`${folderName}/${file}`);
                    const data = {
                        name: commandName,
                        description: command.description || "Error: No description found",
                        category: folderName.replace(`${botPath}/commands/`, "").replace("/", "")
                    }
                    if (data.category !== 'Pen' && data.category !== 'Testing' && command.testOnly !== true) {
                        commandsArray.push(data);
                    }
                });
            })

            try {
                commandsArray.forEach(command => {
                    embed.addField(`\n--------------------------\n${command.name}`, `Description: ${command.description}\nCategory: ${command.category}\n\n`, { inline: true });
                })
                return {
                    custom: true,
                    embeds: [embed],
                    ephemeral: true
                }
            } catch (err) {
                console.log('Something went wrong while trying to list all commands');
                return interaction.reply({ content: 'Something went wrong while trying to list commands', ephemeral: true });
            }
    }
}