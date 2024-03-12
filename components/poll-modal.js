const { EmbedBuilder, ModalSubmitInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = {
    customId: 'pollmodal',
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */
    async execute(interaction) {
        const question = interaction.fields.getTextInputValue('question');
        const options = interaction.fields.getTextInputValue('options').split(',');
        let timeChoice = interaction.fields.getTextInputValue('time');
        await interaction.deferReply();

        if (options.length < 2) {
            interaction.followUp({content: 'Please provide at least two poll options.', ephemeral: true});
            return;
        }

        let date = new Date();
        date = date.setMinutes(date.getMinutes() + timeChoice);
        const timestamp = Math.floor(date.getTime() / 1000);

        // Create poll embed
        const embed = new EmbedBuilder()
            .setTitle(question)
            .setDescription(`Made by ${interaction.user}, Ended in <t:${timestamp}:R>`)
            .setTimestamp(Date.now())
            .setColor('Aqua')
            .setFooter({text: 'Started'})
            .addFields({name: 'Status', value: `⌛Pending`});

        let components = [];
        options.forEach((option, index) => {
            embed.addFields({name: `${emojis[index]}  ${option.trim().replace(/^./, option.trim()[0].toUpperCase())}`,
            value: '0',inline: false});

            components.push(
                new ButtonBuilder()
                    .setEmoji(emojis[index])
                    .setCustomId(`poll-${index + 1}`)
                    .setLabel(option)
                    .setStyle(ButtonStyle.Primary)
            );
        });
        const row = new ActionRowBuilder()
        components.forEach((component) => {
            row.addComponents(component)
        })

        if (timeChoice == '' || !timeChoice) {
            row.addComponents(new ButtonBuilder().setCustomId('poll-close').setEmoji('⛔').setStyle(ButtonStyle.Danger).setLabel('Close'));
            const oke = await interaction.followUp({content: `# New Poll`, embeds: [embed], components: [row]});
        } else {
            const oke = await interaction.followUp({content: `# New Poll`, embeds: [embed], components: [row]});
            let date = new Date();
            date = date.setMinutes(date.getMinutes() + timeChoice);
            setTimeout(async () => {
                oke.embeds[0].fields[0].value = '⛔Closed';
                oke.edit({embeds: [embed], components: []});
                oke.reply('⛔ Poll Clossed');
            }, timeChoice);
        }
    }
}