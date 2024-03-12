const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const kbbi = require('kbbi.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kbbi')
    .setDescription('Get word data in kbbi')
    .addStringOption(option => option.setName('word').setDescription('Keyword').setRequired(true)),
  async execute(interaction) {
    try {
      const query = interaction.options.getString('word');

      // Use await to properly handle the asynchronous call
      const result = await kbbi.cari(query);

      if (!result || !result.arti || result.arti.length === 0) {
        interaction.reply({ content: 'Word not found', ephemeral: true });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Word: ${query}`)
        .setDescription(`Lema: ${result.lema}`);

      result.arti.forEach((arti, index) => {
        embed.addFields({ name: `Arti ${index + 1}`, value: `${arti}` });
      });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'An error occurred', ephemeral: true });
    }
  },

  deleted: false
};
