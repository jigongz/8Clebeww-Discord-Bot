const { EmbedBuilder, ButtonInteraction } = require('discord.js');
let done = new Set();

module.exports = {
    customId: 'poll',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const index = interaction.customId.split('-')[1];
        if (index == 'close') {
            const date = new Date();
            const endedDate = date.toDateString();
            const hour = date.getHours().toString();
            const minute = date.getMinutes().toString();
            interaction.message.embeds[0].fields[0].value = '⛔Closed';
            const newEmbed = EmbedBuilder.from(interaction.message.embeds[0]);
            newEmbed.setDescription(`Made by ${interaction.user}\nEnded in ${hour}.${minute}, ${endedDate}`);
            interaction.message.edit({content: '# Closed Poll',embeds: [newEmbed], components: []});
            interaction.message.reply('⛔ Poll Clossed');
        } else {
            if (done.has(`${interaction.message.id}-${interaction.user.id}`)) {
                interaction.reply('You already voted');
            } else {
                interaction.message.embeds[0].fields[index].value = parseInt(interaction.message.embeds[0].fields[index].value) + 1;
                interaction.update({embeds: [interaction.message.embeds[0]]});
                done.add(`${interaction.message.id}-${interaction.user.id}`);
            }
        }

    }
}