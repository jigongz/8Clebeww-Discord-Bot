const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const ANILIST_API_URL = 'https://graphql.anilist.co';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('manga')
    .setDescription('Search for information about a manga')
    .addStringOption(option => option.setName('query').setDescription('Enter the name of the manga').setRequired(true)),
  async execute(interaction) {
    const query = interaction.options.getString('query');

    try {
      const response = await axios.post(ANILIST_API_URL, {
        query: `
          query ($search: String) {
            Media (search: $search, type: MANGA) {
              title {
                romaji
                english
              }
              description
              chapters
              volumes
              averageScore
              startDate {
                year
              }
              endDate {
                year
              }
              coverImage {
                large
              }
            }
          }
        `,
        variables: {
          search: query,
        },
      });

      const mangaData = response.data.data.Media;

      // Check if the description exists and is not empty
      const description = mangaData.description ? mangaData.description.replace(/<br>/g, '').replace(/<b>/, '') : 'No description available';

      // Convert chapters, volumes, averageScore, startDate, and endDate to strings
      const chapters = mangaData.chapters?.toString() || 'Unknown';
      const volumes = mangaData.volumes?.toString() || 'Unknown';
      const averageScore = mangaData.averageScore?.toString() || 'Unknown';
      const startDate = mangaData.startDate?.year?.toString() || 'Unknown';
      const endDate = mangaData.endDate?.year?.toString() || 'Unknown';

      const embed = {
        color: 2,
        title: mangaData.title.romaji,
        description: description,
        image: { url : mangaData.coverImage.large},
        fields: [
          { name: 'Chapters', value: chapters, inline: true },
          { name: 'Volumes', value: volumes, inline: true },
          { name: 'Score', value: averageScore, inline: true },
          { name: 'Start Date', value: startDate, inline: true },
          { name: 'End Date', value: endDate, inline: true },
        ],
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error occurred while searching for the manga.', ephemeral: true });
    }
  },

  deleted: false
};
