const { SlashCommandBuilder } = require('discord.js');
const quoteAPI = require('quote-indo')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Random quotes')
        .addStringOption(option => option
            .setName('category')
            .setDescription('Choose spesific category')
            .setRequired(false)
            .addChoices(
                {name: 'bucin', value: 'bucin'},
                {name: 'galau', value: 'galau'},
                {name: 'kehidupan', value: 'kehidupan'},
                {name: 'random', value: 'random'}
            )
        ),

    async execute(interaction) {
        const query = interaction.options.getString('category') || 'random';
        const result = await quoteAPI.Quotes(query);

        interaction.reply(result);
    },

    deleted: false
};