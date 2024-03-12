const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong'),

    async execute(interaction) {
        await interaction.reply({
    content: `Pong! ${Date.now() - interaction.createdTimestamp} ms`,
    ephemeral: true // Set this to true for a private reply
});
    },

    deleted: false
};