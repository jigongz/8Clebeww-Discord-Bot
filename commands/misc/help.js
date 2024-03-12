const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display a list of available commands'),
    async execute(interaction) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('Set category')
            .setMinValues(1)
            .setMaxValues(1)
        
        const embed = new EmbedBuilder()
            .setTitle('Available Commands')
            .setDescription('This is the list of available category and feature from 8Clebew Discord Bot,  if you want detail please select menu below')
            .setColor('#7289DA'); // You can customize the color

        const category = fs.readdirSync(path.join(__dirname, '../'))
        category.forEach(category => {
            const data = require(`../${category}/data/data.js`);
            menu.addOptions(  
                new StringSelectMenuOptionBuilder()
                    .setLabel(category.replace(/^./, category[0].toUpperCase()))
                    .setValue(category)
                    .setDescription(data.description)
                    .setEmoji(data.emoji)
            );
            embed.addFields({name: `${data.emoji} ${category.replace(/^./, category[0].toUpperCase())}`, value: data.description});
        });

        const row = new ActionRowBuilder().addComponents(menu);

        embed.addFields({name: 'Features', value: 'Temporary voice channel, ChatGpt( If its on :v), Welcome Card \n Kalo ada saran bilang ya'});

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },

    deleted: false
};
