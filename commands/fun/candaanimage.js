const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('candaanimage')
        .setDescription('Menampilkan candaan berbentuk gambar'),
    async execute(interaction) {
        axios.get("https://candaan-api.vercel.app/api/image/random").then(response => {
            if (response.status === 200) {
              const data = response.data.data.url; // Extract the "data" field from the response
              const embed = new EmbedBuilder().setTitle(`Source : ${response.data.data.source}`).setImage(data);
              interaction.reply({ embeds: [embed] });
            }});
    },

    deleted: false
};