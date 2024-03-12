const { Interaction, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    customId: 'help',
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const category = interaction.values[0];
        interaction.channel.sendTyping;
        const data = require(`../commands/${category}/data/data.js`);
        const embed = new EmbedBuilder().setTitle(data.emoji + category.replace(/^./, category[0].toUpperCase())).setDescription(data.description).setColor('#7289DA');;

        const files = fs.readdirSync(path.join(__dirname, `../commands/${category}`)).filter(file => file.endsWith('.js'));
        files.forEach(file => {
            const command = require(`../commands/${category}/${file}`);
            embed.addFields({name: '/' + command.data.name, value: command.data.description});
        })
        
        interaction.update({embeds: [embed], ephemeral: true});
    }
}