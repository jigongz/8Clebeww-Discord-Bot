const { Client, ActivityType } = require("discord.js");

let status = [
  {
    name: 'Group Gabut',
    type: ActivityType.Competing
  },
  {
    name: '| Akad - Payung Teduh |',
    type: ActivityType.Listening,
    url: 'https://www.youtube.com/watch?v=viW0M5R2BLo'
  },
  {
    name: '| Hati-Hati di Jalan - Tulus |',
    type: ActivityType.Listening,
    url: 'https://www.youtube.com/watch?v=9II3OGZETo4'
  },
  {
    name: 'Group Gabut',
    type: ActivityType.Playing
  },
  {
    name: 'Group Gabut',
    type: ActivityType.Streaming
  },
  {
    name: 'Group Gabut',
    type: ActivityType.Listening
  },
  {
    name: 'Genshin Impact',
    type: ActivityType.Playing
  },
  {
    name: 'Roblox',
    type: ActivityType.Playing,
    url: 'https://www.roblox.com/home'
  },
  {
    name: 'Car Driving Indonesia',
    type: ActivityType.Playing,
    url: 'https://www.roblox.com/games/6911148748/Car-Driving-Indonesia'
  },
  {
    name: 'Valorant',
    type: ActivityType.Playing,
  },
]

/**
 * 
 * @param { Client } client 
 */
module.exports = {
  name: 'ready',

  /**
   * 
   * @param {Client} client 
   */
  execute(client) {
    console.log(`${client.user.tag} is online.`);
    try {
      let random = Math.floor(Math.random() * status.length);
        client.user.setPresence({activities: [status[random]], status: 'online'});
      setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setPresence({activities: [status[random]], status: 'online'});
      }, 600000); 
    } catch (error) {
      console.log(`Error while set activity : ${error}`)
    }
  }
};