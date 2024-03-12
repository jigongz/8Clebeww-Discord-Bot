const { SlashCommandBuilder,ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll'),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setTitle('Making New Poll')
            .setCustomId('pollmodal-work');

        const question = new TextInputBuilder()
            .setLabel('Whats your question?')
            .setPlaceholder('Question ...')
            .setCustomId('question')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const row1 = new ActionRowBuilder().addComponents(question);

        const option = new TextInputBuilder()
            .setLabel('Whats your options?')
            .setCustomId('options')
            .setPlaceholder('Up to 10 options, Separated with comma(,)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const row2 = new ActionRowBuilder().addComponents(option);

        const time = new TextInputBuilder()
            .setLabel('How long is your poll in minutes?')
            .setCustomId('time')
            .setPlaceholder('Not required')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);
        const row3 = new ActionRowBuilder().addComponents(time);

        modal.addComponents(row1, row2, row3);
        interaction.showModal(modal);
    },
    botPermission: [],
    needPermisiion: [],
};