const axios = require('axios');
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discohook')
        .setDescription('Send discohook message to channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(x => x
            .setName('share-link')
            .setDescription('Discohook Message Share Link You Want To Send')
            .setRequired(true)
        ).addChannelOption(x => x
            .setName('channel')
            .setDescription('Channel You Want To Send')
            .setRequired(false)
        ),
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction 
    */
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        let channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('share-link');
        if (channel == null) {
            channel = interaction.channel;
        };
        /**
         * @type {string}
         */
        let result;
        try {
            const response = await axios.get(message, {
              maxRedirects: 5, // Allow up to 5 redirects (adjust as needed)
            });

            result = response.request.res.responseUrl;
          } catch (error) {
            console.error('Axios error:', error.message);
            interaction.editReply({ content: 'start URL error', ephemeral: true });
            return;
          }
        if (!result) {
            interaction.editReply({ content: 'end url error', ephemeral: true });
            return
        };
        const encrypt = result.replace('https://discohook.org/?data=', ' ');
        const buff = Buffer.from(encrypt, 'base64');
        const json = JSON.parse(buff.toString('utf-8'));
        /**
         * @type {Array}
         */
        const messages = json.messages;
        if (messages.length == 1) {
            channel.send(messages[0].data);
            interaction.editReply({content: 'Embed sended'});
            return;
        } else {
            messages.forEach(element => { 
                channel.send(element.data);
            });
            interaction.editReply({content: 'Embed sended'});
            return;
        }
    },
    botPermission: [],
    needPermisiion: [],
};