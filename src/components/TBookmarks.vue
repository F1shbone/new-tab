<script setup>
import { ref } from 'vue';

const bookmarks = ref([
  {
    name: 'Youtube',
    url: 'https://www.youtube.com',
    favicon: 'https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png',
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/directory',
    favicon:
      'https://static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png',
  },
  {
    name: 'Bell of lost Souls',
    url: 'https://www.belloflostsouls.net/posts',
    favicon:
      'https://www.belloflostsouls.net/wp-content/uploads/2018/03/favicon.png',
  },
  {
    name: 'Games Workshop',
    url: 'https://www.games-workshop.com/de-DE/Ziel',
    favicon:
      'https://www.games-workshop.com/templates/gw/apple-touch-icon-144x144.png',
  },
  {
    name: '9to5Mac',
    url: 'https://9to5mac.com/',
    favicon:
      'https://9to5mac.com/wp-content/themes/9to5-2015/images/favicons/9to5mac/icon-192x192.png',
  },
]);
</script>

<template>
  <div class="flex">
    <a
      v-for="(bookmark, i) in bookmarks"
      :key="i"
      :href="bookmark.url"
      class="flex flex-col items-center justify-start w-20 m-1 p-[5px] rounded-lg h-28 hover:bg-base-300"
    >
      <figure class="rounded-lg shadow-xl bg-base-100">
        <img :src="bookmark.favicon" class="p-4 w-[70px] h-[70px]" />
      </figure>
      <p
        class="max-w-full pt-4 pb-2 overflow-hidden text-xs text-ellipsis whitespace-nowrap"
      >
        {{ bookmark.name }}
      </p>
    </a>
  </div>
</template>
