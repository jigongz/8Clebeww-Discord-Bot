const { Events, VoiceState, CategoryChannel, ChannelType } = require('discord.js');
const config = require('../../config.json');
const { channel } = require('diagnostics_channel');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    /**
     * 
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @returns 
     */

    async execute(oldState, newState) {
        const category = config.Testserver['Join to Create'].categoryId;
        if(newState.channelId == config.Testserver['Join to Create'].targetChannelId) {
            const member = newState.member;
            const channelName = `${member.displayName} Lounge`
            const existChannel = newState.guild.channels.cache.find(channel=> channel.type == ChannelType.GuildVoice & channel.name == channelName)
            if(existChannel) {
                newState.member.voice.setChannel(existChannel);
            } else {
                const newChannel = await newState.guild.channels.create({
                name: `${member.displayName} Lounge`,
                parent: category,
                type: ChannelType.GuildVoice,
                userLimit: 5
                });
                newState.member.voice.setChannel(newChannel);
            }
        } else if (oldState.channel.parentId == category) {
            if (oldState.channelId == config.Testserver['Join to Create'].targetChannelId) return;
            if (oldState.channel.members.size == 0) {
                oldState.channel.delete();
            }
        }
    },
};
