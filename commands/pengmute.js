// JAVASCRIPT:
const warnSchema = require('../models/gmute-schema')
const { MessageEmbed } = require('discord.js')

module.exports = {
  category: "Pen",
  description: "No description found",

  slash: true,
  testOnly: true,
  guildOnly: true,
  ownerOnly: true,

  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "No description found",
      options: [
        {
          name: "user",
          type: "USER",
          description: "No description found",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "No description found",
      options: [
        {
          name: "user",
          type: "USER",
          description: "No description found",
          required: true,
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "gmuted",
      description: "No description found",
      options: [
        {
          name: "user",
          type: "USER",
          description: "No description found",
          required: true,
        },
      ],
    },
  ],

  callback: async ({ guild, member: staff, interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");

    return 'Not setup yet'

//     if (subCommand === "add") {
//       const warning = await warnSchema.create({
//         userId: user?.id
//       });

//       return {
//         custom: true,
//         content: `Added gmute ${warning.id} to <@${user?.id}>`,
//         allowedMentions: {
//           users: [],
//         },
//       };
//     } else if (subCommand === "remove") {
//       const warning = await warnSchema.findByIdAndDelete(id);

//       return {
//         custom: true,
//         content: `Removed gmute ${warning.id} from <@${user?.id}>`,
//         allowedMentions: {
//           users: [],
//         },
//       };
//     } else if (subCommand === "gmuted") {
//       const warnings = await warnSchema.find({
//         userId: user?.id
//       });

//       let description = `Results:\n\n`;

//       for (const warn of warnings) {
//         description += `**ID:** ${warn._id}\n`;
//         description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
//       }

//       const embed = new MessageEmbed().setDescription(description);

//       return embed;
//     }
  },
}