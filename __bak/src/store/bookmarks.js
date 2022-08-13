const namespaced = true;

const state = () => ({
  items: [
    {
      name: 'Youtube',
      url: 'https://www.youtube.com',
      // icon: 'chrome://favicon/https://www.youtube.com',
      icon: 'https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png',
    },
    {
      name: 'Twitch',
      url: 'https://www.twitch.tv/directory',
      // icon: 'chrome://favicon/https://www.twitch.tv',
      icon:
        'https://static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png',
    },
    {
      name: 'Bell of Lost Souls',
      url: 'https://www.belloflostsouls.net/posts',
      // icon: 'chrome://favicon/https://www.belloflostsouls.net',
      icon:
        'https://www.belloflostsouls.net/wp-content/uploads/2018/03/favicon.png',
    },
    {
      name: 'Games Workshop',
      url: 'https://www.games-workshop.com/de-DE/Ziel',
      // icon: 'chrome://favicon/https://www.games-workshop.com',
      icon:
        'https://www.games-workshop.com/templates/gw/apple-touch-icon-144x144.png',
    },
    {
      name: 'Roll20',
      url: 'https://roll20.net/welcome',
      // icon: 'chrome://favicon/https://roll20.net',
      icon: 'https://app.roll20.net/images/Roll20-OG.png',
    },
    {
      name: '9to5mac.com',
      url: 'https://9to5mac.com/',
      // icon: 'chrome://favicon/https://9to5mac.com',
      icon:
        'https://9to5mac.com/wp-content/themes/9to5-2015/images/favicons/9to5mac/icon-192x192.png',
    },
  ],
});

const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
