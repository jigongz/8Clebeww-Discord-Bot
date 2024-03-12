const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const ANILIST_API_URL = 'https://graphql.anilist.co';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anime')
    .setDescription('Search for information about an anime')
    .addStringOption(option => option.setName('query').setDescription('Enter the name of the anime').setRequired(false)),
  async execute(interaction) {
    var query = interaction.options.getString('query');
    if (query === '') {
      getRandomAnime()
      query = randomAnime
    }

    try {
      const response = await axios.post(ANILIST_API_URL, {
        query: `
          query ($search: String) {
            Media (search: $search, type: ANIME) {
              title {
                romaji
                english
              }
              description
              episodes
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
              genres
              format
            }
          }
        `,
        variables: {
          search: query,
        },
      });

      const animeData = response.data.data.Media;
      // Check if the description exists and is not empty
      const description = animeData.description ? animeData.description.replace(/<br>/g, '').replace(/<b>/, '') : 'No description available';

      // Convert episodes, averageScore, startDate, and endDate to strings
      const episodes = animeData.episodes?.toString() || 'Unknown';
      const averageScore = animeData.averageScore?.toString() || 'Unknown';
      const startDate = animeData.startDate?.year?.toString() || 'Unknown';
      const endDate = animeData.endDate?.year?.toString() || 'Unknown';
      const genre = animeData.genres.join(', ');
      
      const embed = {
        color: 2,
        title: animeData.title.romaji,
        description: description,
        image: { url: animeData.coverImage.large },
        fields: [
          { name: '📺 Type', value: animeData.format, inline: true},
          { name: '🎈Genres', value: genre, inline: true },
          { name: '🖼️Episodes', value: episodes, inline: true },
          { name: '✨Score', value: averageScore, inline: true },
          { name: '✈️ Aired', value: `From ${startDate} to ${endDate}`, inline: true },
          
        ],
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error occurred while searching for the anime.', ephemeral: true });
    }
  },

  deleted: false
};

async function getRandomAnime() {
  try {
    const response = await axios.get('https://api.anilist.co/anime', {
      params: {
        sort: 'POPULARITY_DESC',
        page: Math.floor(Math.random() * 10) + 1, // Get a random page (1 to 10)
        perPage: 1, // Get only one result
      },
    });

    const randomAnime = response.data?.data[0];
  }catch(err) {
    console.error(err)
  }
}
