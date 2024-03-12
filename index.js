const { Client, GatewayIntentBits, Collection, ChannelType, Component } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function App() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ]
  });

  // Command Handler

  client.commands = new Collection();
  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }

  client.components = new Collection();
  const componentFiles = fs.readdirSync(`./components/`).filter(file => file.endsWith('.js'));
  for (const file of componentFiles) {
    const component = require(`./components/${file}`);
    if ('customId' in component && 'execute' in component) {
      client.components.set(component.customId, component)
    }
  }

  // Event Handler

  const eventFolders = fs.readdirSync('./events')
  for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
      const event = require(`./events/${folder}/${file}`);
      if (event.deleted === true) continue;
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };

  const http = require('http');
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('24/7 Group Gabut Discord Bot Web Server');
  });
  server.listen(5000);

  // Login

  client.login(process.env.TOKEN);
};

let isRunning = false;
setInterval(() => {
  if (!isRunning) {
    try {
      isRunning = true;
      App();
    } catch (error) {
      isRunnig = false;
      console.log(error);
    }
  }
}, 300000)
