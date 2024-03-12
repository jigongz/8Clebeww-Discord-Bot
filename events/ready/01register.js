const { REST, Routes } = require('discord.js');
const config = require('../../config.json')
const path = require('path');
require('dotenv').config()
const fs = require('fs');

const comm = []
const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	try {
		// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			comm.push(command.data.toJSON());
			if ( command.deleted == true ) continue;
			commands.push(command.data.toJSON());
			if ('description' in command.data) {
				if (typeof command.data.description !== 'string') {
					console.log(`[WARNING] The description of the command at ${filePath} is not a string.`);
					// Optionally, set a default description here
					commandData.setDescription('Default description');
				}
			}

		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
	} catch (error) {
		console.log(error)
	}
	
}

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const rest = new REST().setToken(process.env.TOKEN);
	    try {
		    console.log(`Started refreshing ${comm.length} application (/) commands.`);

		    // The put method is used to fully refresh all commands in the guild with the current set
		    const data = await rest.put(
			Routes.applicationGuildCommands(config.bot.clientId, config.Testserver.guildId),
			{ body: commands },
		    );

		    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	    } catch (error) {
		    // And of course, make sure you catch and log any errors!
		    console.error(error);
	    }
    },
}
