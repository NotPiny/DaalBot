module.exports = {
    category: 'Moderation',
  description: 'Test version of ban command',

  // permissions: ['ADMINISTRATOR'],
//   requireRoles: true,

  slash: true,
  testOnly: true,
  ownerOnly: true,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback:  async ({ message, interaction, args }) => {
    const target = interaction.options.getMember('user')
    if (!target) {
        return 'Please tag someone to ban.'
    }

    if (!target.bannable) {
        return 'Cannot ban that user.'
    }

    const reason = interaction.options.getString('reason');

    interaction.reply(`lorem ipusm dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl nec nisl. Donec auctor, nisl nec ultricies lacinia, n`);
    const msg = await interaction.fetchReply();
    console.log(msg);
  },
} 