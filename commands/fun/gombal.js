const { SlashCommandBuilder, Interaction } = require('discord.js');
const gombal = require('../../gombal.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gombal')
        .setDescription('Mau digombalin gaa??'),
        /**
         * 
         * @param {Interaction} interaction 
         */
    async execute(interaction) {
        const gombals = gombal.gombal;
        interaction.channel.sendTyping;
        const random = gombals[Math.floor(Math.random() * gombals.length)];
        interaction.reply({content: random, ephemeral: true});
        
    },

    deleted: false
};