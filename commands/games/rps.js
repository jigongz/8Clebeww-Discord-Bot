const { SlashCommandBuilder } 
= require('discord.js');
const { RockPaperScissors } = require('discord-gamecord')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Gunting Batu Kertas !')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('Siapa yang menang ya? 😎').setRequired(true)),
    async execute(interaction) {
        const Game = new RockPaperScissors({
  message: interaction,
  isSlashGame: true,
  opponent: interaction.options.getUser('user'),
  embed: {
    title: 'Rock Paper Scissors',
    color: '#5865F2',
    description: 'Press a button below to make a choice.'
  },
  buttons: {
    rock: 'Batu',
    paper: 'Kertas',
    scissors: 'Gunting'
  },
  emojis: {
    rock: '🌑',
    paper: '📰',
    scissors: '✂️'
  },
  mentionUser: true,
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  pickMessage: 'Kamu memilih {emoji}.',
  winMessage: '**{player}** menang!',
  tieMessage: 'Seri ..',
  timeoutMessage: 'Seseorang mengabaikan permainan',
  playerOnlyMessage: 'Hanya {player} dan {opponent} yang bisa menggunakan tombol.'
});

Game.startGame();
      Game.on('ready', () => {
        setTimeout(() => {
          interaction.deleteReply();
        }, 15000);
      });
    },
    deleted: false
};