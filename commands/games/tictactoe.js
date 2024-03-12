const { SlashCommandBuilder } 
= require('discord.js');
const { TicTacToe } = require('discord-gamecord')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Tic Tac Toe !')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('Siapa yang menang ya? 😎').setRequired(true)),
    async execute(interaction) {
        const Game = new TicTacToe({
  message: interaction,
  isSlashGame: true,
  opponent: interaction.options.getUser('user'),
  embed: {
    title: 'Tic Tac Toe',
    color: '#5865F2',
    statusTitle: 'Status',
    overTitle: 'Game Over'
  },
  emojis: {
    xButton: '❌',
    oButton: '🔵',
    blankButton: '➖'
  },
  mentionUser: true,
  timeoutTime: 60000,
  xButtonStyle: 'DANGER',
  oButtonStyle: 'PRIMARY',
  turnMessage: '{emoji} | Sekarang giliran **{player}**.',
  winMessage: '{emoji} | **{player}** menang !!',
  tieMessage: 'Seri ..',
  timeoutMessage: 'Game diabaikan ..',
  playerOnlyMessage: 'Hanya {player} dan {opponent} yang bisa menggunakan tombol ini.'
});

Game.startGame();
      Game.on('gameOver', () => {
        setTimeout(() => {
          interaction.deleteReply();
        }, 15000);
      });
    },
    deleted: false
};