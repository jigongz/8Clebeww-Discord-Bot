const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '../../components/')).filter(file => file.endsWith('.js'));

module.exports = {
    name: 'interactionCreate',
    
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     */
    async execute(interaction, client) {
        if (!interaction.isAnySelectMenu) return;
        if(!interaction.isButton) return;
        if(!interaction.isModalSubmit) return;

        const component = client.components.get(interaction.customId);
        if (!component) return;

        await component.execute(interaction);
    }
}