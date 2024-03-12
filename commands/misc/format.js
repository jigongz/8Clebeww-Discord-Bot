const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Embed, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('format')
        .setDescription('Mengubah gambar / video menjadi url')
        .addSubcommand(x => x
            .setName('imageurl')
            .setDescription('Format image to url')
            .addAttachmentOption(x => 
                x.setName('image')
                .setDescription('The image')
                .setRequired(true)
            )
        ).addSubcommand(x => x
            .setName('mention')
            .setDescription('Format user tag or user mention for discohook/copypaste')
            .addMentionableOption(x => x
                .setName('user')
                .setDescription('User you want to format')
                .setRequired(true)
            )
        ).addSubcommand(x => x
            .setName('channel')
            .setDescription('Format channel for discohook/copypaste')
            .addMentionableOption(x => x
                .setName('channel')
                .setDescription('Channel you want to format')
                .setRequired(true)
            )
        ).addSubcommand(x => x
            .setName('emoji')
            .setDescription('Format emoji for discohook/copypaste')
            .addMentionableOption(x => x
                .setName('emoji')
                .setDescription('One emoji only :)')
                .setRequired(true)
            )
        ),

    /**
     * ! Hati-hati dalam mengubah variable
     * * Jangan lupa mendukung dengan meluaskan bot ini
     * ? Jika ada pertanyaan bisa chat :)
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        // Get Subcommand
        const subcommand = interaction.options.getSubcommand();
        // Agar membantu pengiriman hasil
        let result;
        let image = false;
        let output;

        switch (subcommand) {
            case 'imageurl':
                // Mengubah gamber ke url menggunakan URL
                const image = interaction.options.getAttachment('image');
                result = String(URL.createObjectURL(image));
                image = true;
                output = '\u200B'
                break;

            case 'mention':
                // Mengubah mention mnejadi <@>
                const mention = interaction.options.getMentionable('mention');
                result = `<@${user.id}>`
                output = `<@${user.id}>`
                break;

            case 'channel':
                // Mengubah channel menjadi <#>, bisa juga untuk voice channel
                const channel = interaction.options.getChannel('channel');
                result = `<#${channel.id}>`
                output = `<#${channel.id}>`
                break;

            case 'emoji':
                // Mengubah emoji menjadi :emoji: contoh 💀 => :skull:
                const emoji = interaction.options.getString('emoji');
                result = `\\${emoji}`
                output = emoji
                break;

            default:
                // Subcommand pasti ada jadi jika error tidak terjadi apa apa
                break;
        }

        // Membuat embed
        const embed = new EmbedBuilder({
            "title": "## Format Result",
            "description": '**Result:**\n```' +  result + '```\n**Output**\n' + output,
            "color": 55039
        });

        // Jika command adalah /format imageurl akan menambahkan gambar sebagai hasil
        if (image) {
            embed.setImage(result);
        };

        // Mengirim hasil
        interaction.reply({embeds: [embed], ephemeral: true});
    },
    botPermission: [],
    needPermisiion: [],
};