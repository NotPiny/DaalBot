// JAVASCRIPT:
const warnSchema = require('../../models/warn-schema')
const { MessageEmbed } = require('discord.js')
const daalbot = require('../../daalbot.js');

module.exports = {
  category: "Moderation",
  description: "Warns a user",

  requireRoles: true,

  slash: true,
  testOnly: false,
  guildOnly: true,

  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "Adds a warning to the user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to add a warning to",
          required: true,
        },
        {
          name: "reason",
          type: "STRING",
          description: "The reason for the warning",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "Removes a warning from the user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to remove a warning from",
          required: true,
        },
        {
          name: "id",
          type: "STRING",
          description: "The ID of the warning to remove",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "list",
      description: "Lists all warnings for the user",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to list warnings for",
          required: true,
        },
      ],
    },
  ],

  callback: async ({ guild, member: staff, interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const id = interaction.options.getString("id");

    if (subCommand === "add") {
      const warning = await warnSchema.create({
        userId: user?.id,
        staffId: staff.id,
        guildId: guild?.id,
        reason,
      });
      const embed = new MessageEmbed()
      .setTitle('Success')
      .setDescription(`Added warning to <@${user?.id}>\nReason: \`${reason}\``)
      .setColor(0x40ff00)
      .setFooter({
        text: `ID: ${warning.id}`,
        iconURL: user?.displayAvatarURL({ dynamic: true }),
      })

      user?.send(`You have been warned in ${guild?.name} for \`${reason}\``)
      .then(() => {
        console.log(`Warned ${user?.tag} for ${reason}`)
      })
      .catch(() => {
        console.log(`Failed to send DM to ${user?.tag}`)
        interaction.channel.send(`<@${user?.id}>, you have been warned for \`${reason}\``)
      });

      return {
        custom: true,
        content: `Done!`,
        embeds: [embed],
        allowedMentions: {
          users: [],
        },
        ephemeral: true,
      }
      
      
    } else if (subCommand === "remove") {
      daalbot.warnings.delete(id);
      const embed = new MessageEmbed()
      .setTitle(`Success`)
      .setDescription(`Removed warning from <@${user?.id}>`)
      .setColor(0xff0000)
      .setFooter({
        text: `ID: ${id}`,
      })

      return {
        custom: true,
        content: `Done!`,
        embeds: [embed],
        allowedMentions: {
          users: [],
        },
        ephemeral: true,
      }
    } else if (subCommand === "list") {
      const warnings = await warnSchema.find({
        userId: user?.id,
        guildId: guild?.id,
      });

      let description = `Warnings for <@${user?.id}>:\n\n`;

      for (const warn of warnings) {
        description += `**ID:** ${warn._id}\n`;
        description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
        description += `**Staff:** <@${warn.staffId}>\n`;
        description += `**Reason:** ${warn.reason}\n\n`;
      }

      const embed = new MessageEmbed().setDescription(description);

      return {
        custom: true,
        content: `Here are the warnings for <@${user?.id}>`,
        embeds: [embed],
        allowedMentions: {
          users: [],
        },
        ephemeral: true,
      }
    }
  },
}