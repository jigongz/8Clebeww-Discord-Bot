const { SlashCommandBuilder } = require('discord.js');
const { MatchPairs } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('matchpairs')
    .setDescription('Sambungkan emoji untuk menang')
    .setDMPermission(false),

  async execute(interaction) {
    const Game = new MatchPairs({
  message: interaction,
  isSlashGame: true,
  embed: {
    title: 'Match Pairs',
    color: '#5865F2',
    description: '**Klik tombol untuk membalik kartu dan menunjukkan emoji**'
  },
  timeoutTime: 60000,
  emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
  winMessage: '**Kamu menang! Kamu membalikkan `{tilesTurned}` kartu.**',
  loseMessage: '**Kamu kalah! Kamu membalikkan `{tilesTurned}` kartu.**',
  playerOnlyMessage: 'Hanya {player} yang bisa menggunakan tombol ini'
});

Game.startGame();
Game.on('gameOver', () => {
setTimeout(() => {
  interaction.deleteReply();
},15000);
});
  },
  deleted: false
}