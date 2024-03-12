const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for muting'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        interaction.deferReply()


        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

if (!mutedRole) {
    await interaction.followUp("The 'Muted' role does not exist. Please create it.");
    return;
}

await user.roles.add(mutedRole);

        const channel = client.channels.cache.get(config.Testserver.moderation.AnnouncementId);
        await channel.send(`${user.tag} has muted \n Reason: ${reason}`);
        await interaction.followUp(`Muted ${user.tag} for ${reason}`);
    },
    botPermission: [],
    needPermisiion: [],
};
