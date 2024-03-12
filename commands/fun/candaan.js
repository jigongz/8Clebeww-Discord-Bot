const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('candaan')
        .setDescription('Menampilkan candaan'),
    async execute(interaction) {
        axios.get("https://candaan-api.vercel.app/api/text/random").then(response => {
            if (response.status === 200) {
              const data = response.data.data; // Extract the "data" field from the response
              interaction.reply(data);
            }});

    },

    deleted: false
};