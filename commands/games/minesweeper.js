const { SlashCommandBuilder } 
= require('discord.js');
const { Minesweeper } = require('discord-gamecord')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('minesweeper')
        .setDescription('Hati-hati ada bom')
        .setDMPermission(false),
    async execute(interaction) {
        const Game = new Minesweeper({
  message: interaction,
  isSlashGame: true,
  embed: {
    title: 'Minesweeper',
    color: '#5865F2',
    description: 'Klik tombol di bawah ini untuk menunjukkan bom di sekitar'
  },
  emojis: { flag: '🚩', mine: '💣' },
  mines: 5,
  timeoutTime: 60000,
  winMessage: 'Kamu menang !!',
  loseMessage: 'Kamu kalah ..',
  playerOnlyMessage: 'Hanya {player} yang bisa menggunakan tombol ini'
});

Game.startGame();
      Game.on('gameOver', () => {
        setTimeout(() => {
          interaction.deleteReply()
        }, 15000)
      });
      
    },
    deleted: false
};