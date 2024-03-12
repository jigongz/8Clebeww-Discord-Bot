const { Message, Client, PermissionFlagsBits} = require('discord.js')

module.exports = {
  name: 'messageCreate',

  /** 
  * @param {Client} client
  * @param {Message} message
  */
  async execute(message, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return;
    const args = message.content.trim().split(/ +/g);
    if (args[0] !== '!clear') return;
    const amount = args[1];
    if(amount.typeof === "number" ) return message.reply('amount of messages must number');
    message.channel.bulkDelete(amount);
    message.channel.send(`Cleared ${amount} messsages !`);
  }
}