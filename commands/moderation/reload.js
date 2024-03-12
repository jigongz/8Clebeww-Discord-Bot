const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const config = require('../../config.json');
const path = require('path');
require('dotenv').config();
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload all slash commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        interaction.deferReply();
        const rest = new REST().setToken(process.env.TOKEN)
        const clientId = config.bot.clientId;
        const guildId = config.Testserver.guildId;
        try {
            const commandsPath = path.join(__dirname, '../../commands');
            const commandFolders = fs.readdirSync(commandsPath);

            const commands = [];

            for (const folder of commandFolders) {
                const folderPath = path.join(commandsPath, folder);
                const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
                    const filePath = path.join(folderPath, file);
                    delete require.cache[filePath]; // Clear require cache to reload the module
                    const command = require(filePath);

                    if ('data' in command && 'execute' in command) {
                        const commandData = command.data.toJSON();

                        // Check if the command already exists before pushing it
                        const existingCommand = commands.find(cmd => cmd.name === commandData.name);
                        if (!existingCommand) {
                            commands.push(commandData);
                        }
                    }
                }
            }

            // Delete existing commands
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });

            // Register new commands
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

            interaction.followUp('Slash commands reloaded successfully.');
        } catch (error) {
            console.error('Error reloading slash commands:', error);
            interaction.followUp('An error occurred while reloading slash commands.');
        }
    },
    botPermission: [],
    needPermisiion: [],
};





