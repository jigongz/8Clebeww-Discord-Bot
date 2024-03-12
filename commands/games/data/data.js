const fs = require('fs');
const path = require('path');

const commands = [];

const commandList = fs.readdirSync(path.join(__dirname, '../')).filter(file => file.endsWith('.js'));
for(const file of commandList) {
    const command = require(`../${file}`)
    const data = {
        name: command.data.name,
        description: command.data.description
    };
    commands.push(data)
}

module.exports = {
    command: commands,
    description: 'Lagi gabut?? Coba ini aja',
    emoji: '📱'
}