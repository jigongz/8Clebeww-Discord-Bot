const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempmute')
        .setDescription('Temporarily mute a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration of the mute in minutes')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for muting'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        interaction.deferReply()
        const defaultRoleId = config.Testserver.moderation.defaultRoleId;
        const announcementId = config.Testserver.moderation.AnnouncementId;
        // Tempmute logic
        const mutedRole = config.Testserver.moderation.mutedId
        const role = interaction.guild.roles.cache.get(defaultRoleId);

        if (!mutedRole) {
            await interaction.followUp("The 'Muted' role does not exist. Please create it.");
            return;
        }

        if (interaction.member.roles.highest.position <= user.roles.highest.position) {
            interaction.followUp('Cant mute the user because user role position is higher than you')
        }
        if (interaction.member.roles.highest.position <= client.user.roles.highest.position) {
            interaction.followUp('Cant mute the user because user role position is higher than me')
        }

        const user = interaction.options.getUser('user');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        await user.roles.add(mutedRole);
        await user.roles.remove(role);
        await interaction.followUp(`Temporarily muted ${user.tag} for ${duration} minutes for ${reason}`);

        setTimeout(async () => {
            await user.roles.remove(mutedRole);
            await user.roles.add(role);
        }, duration * 60000); // Convert minutes to milliseconds

        const channel = client.channels.cache.get(announcementId);
        await channel.send(`${user.tag} has muted \n Reason: ${reason}`);
        await interaction.followUp(`Temporarily muted ${user.tag} for ${duration} minutes for ${reason}`);
    },
    botPermission: [],
    needPermisiion: [],
};
