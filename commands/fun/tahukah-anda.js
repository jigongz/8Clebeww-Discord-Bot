const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tahukah-anda')
        .setDescription('Send random facts'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://cinnabar.icaksh.my.id/public/daily/tawiki');
            const data = response.data.data;
      
            const embed = new EmbedBuilder() // Use MessageEmbed instead of EmbedBuilder
              .setTitle('Fakta Harian')
              .setDescription('Fakta hari ini adalah :')
              .setColor('#0099ff')
              .setImage(data.image_link);
      
            data.info.forEach(item => {
              const fact = item.tahukah_anda.replace(/^"|"$/g, '').replace('...', 'Tahukah kamu'); // Remove the surrounding quotes
              embed.addFields({name : `Fact #${item.id + 1}`, value: fact}); // Use addField to add fields
            });
      
            interaction.reply({ embeds: [embed] });
          } catch (error) {
            console.error('Error fetching API data:', error);
            interaction.reply('An error occurred while fetching data from the API.');
          }
    },

    deleted: false
};